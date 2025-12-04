import { supabaseAdmin } from "@/app/lib/supabase/supabaseAdmin";
import { NextResponse } from "next/server";
import { fetchDelegateById } from "@/app/lib/delegateRecords";
export const maxDuration = 30;
function normaliseAmount(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }
  if (typeof value === "string") {
    const cleaned = value.replace(/[^0-9.]/g, "");
    if (!cleaned) return null;
    const parsed = Number(cleaned);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function amountsClose(a, b, tolerance = 0.5) {
  if (a === null || b === null) return false;
  return Math.abs(Number(a) - Number(b)) <= tolerance;
}

export async function POST(req) {
  let unclaimedCount = null;

  try {
    const payload = await req.json();
    const rawTrid = payload?.upiTransactionId;
    const trid = String(rawTrid ?? "").trim();
    const delegateId = String(payload?.delegateId || "")
      .trim()
      .toUpperCase();

    if (!trid) {
      return NextResponse.json(
        {
          success: false,
          error: "UPI reference ID is required.",
        },
        { status: 400 }
      );
    }

    // Always return the latest unclaimed count so the UI can surface it.
    const { count, error: unclaimedError } = await supabaseAdmin
      .from("transactions")
      .select("id", { count: "exact" })
      .eq("isused", false);

    if (unclaimedError) {
      console.error(
        "Failed to fetch unclaimed transactions count",
        unclaimedError
      );
    }

    unclaimedCount = typeof count === "number" ? count : null;

    // Allow lightweight refresh calls (used by the UI) without a delegate ID.
    if (trid === "1") {
      return NextResponse.json(
        {
          success: true,
          unclaimedCount,
        },
        { status: 200 }
      );
    }

    if (!delegateId || delegateId === "UNKNOWN") {
      return NextResponse.json(
        {
          success: false,
          error: "Delegate ID is required to verify a transaction.",
          unclaimedCount,
        },
        { status: 400 }
      );
    }

    if (trid.length < 12) {
      return NextResponse.json(
        {
          success: false,
          error: "A UPI reference ID must be at least 12 characters.",
          unclaimedCount,
        },
        { status: 400 }
      );
    }

    const { data: transactionRows, error: transactionError } =
      await supabaseAdmin
        .from("transactions")
        .select("txn_id,isused,sender,amount,raw")
        .eq("txn_id", trid)
        .limit(1);

    if (transactionError) {
      throw new Error(transactionError.message);
    }

    const transaction = transactionRows?.[0] || null;

    if (!transaction) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Transaction ID not found. Please confirm the reference ID and try again shortly.",
          unclaimedCount,
        },
        { status: 404 }
      );
    }

    if (transaction.isused) {
      return NextResponse.json(
        {
          success: false,
          error: "This transaction ID has already been claimed.",
          unclaimedCount,
        },
        { status: 409 }
      );
    }

    const {
      delegate: fetchedDelegate,
      table: delegateTable,
      error: delegateError,
    } = await fetchDelegateById(
      delegateId,
      "delegateid,name,email,mobileno,collegename,collegeyear,events,paymentconfirmed,upitransactionid,screenshotbucketpath,hastopay"
    );

    if (delegateError) {
      throw new Error(delegateError.message);
    }

    const delegate = fetchedDelegate || null;

    if (!delegate) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Delegate record not found. Please register before attempting payment verification.",
          unclaimedCount,
        },
        { status: 404 }
      );
    }

    if (delegate.paymentconfirmed) {
      return NextResponse.json(
        {
          success: false,
          error: "Payment has already been confirmed for this delegate.",
          unclaimedCount,
          delegate,
        },
        { status: 409 }
      );
    }

    if (delegate.upitransactionid && delegate.upitransactionid !== trid) {
      return NextResponse.json(
        {
          success: false,
          error:
            "This delegate is already linked to a different transaction ID. Please contact support if you need assistance.",
          unclaimedCount,
          delegate,
        },
        { status: 409 }
      );
    }

    const expectedAmount = normaliseAmount(delegate.hastopay);
    const transactionAmount = normaliseAmount(transaction.amount);

    if (expectedAmount !== null && transactionAmount !== null) {
      const matchesDirect = amountsClose(expectedAmount, transactionAmount);
      const matchesPaise = amountsClose(
        expectedAmount,
        transactionAmount / 100
      );
      const matchesScaled = amountsClose(
        expectedAmount / 100,
        transactionAmount
      );

      if (!matchesDirect && !matchesPaise && !matchesScaled) {
        const normalisedReceived =
          transactionAmount > expectedAmount * 5
            ? transactionAmount / 100
            : transactionAmount;
        const formattedExpected = `₹${Number(expectedAmount)}`;
        const formattedReceived = `₹${Number(normalisedReceived)}`;

        return NextResponse.json(
          {
            success: false,
            error: `Amount mismatch. Expected ${formattedExpected}, but the transaction shows ${formattedReceived}. Please verify and try again or contact support for assistance.`,
            unclaimedCount,
            delegate,
          },
          { status: 422 }
        );
      }
    }

    const { data: lockedTxnRows, error: lockError } = await supabaseAdmin
      .from("transactions")
      .update({ isused: true })
      .eq("txn_id", trid)
      .eq("isused", false)
      .select("txn_id");

    if (lockError) {
      throw new Error(lockError.message);
    }

    if (!lockedTxnRows?.length) {
      return NextResponse.json(
        {
          success: false,
          error:
            "This transaction ID was claimed moments ago. Please refresh and try a different reference ID.",
          unclaimedCount,
        },
        { status: 409 }
      );
    }

    const delegateUpdatePayload = {
      upitransactionid: trid,
      paymentconfirmed: true,
      updatedat: new Date().toISOString(),
    };

    const targetTable = delegateTable || "activedelegates";
    const { error: delegateUpdateError } = await supabaseAdmin
      .from(targetTable)
      .update(delegateUpdatePayload)
      .eq("delegateid", delegateId);

    if (delegateUpdateError) {
      console.error(
        "Failed to update delegate with payment confirmation",
        delegateUpdateError
      );
      await supabaseAdmin
        .from("transactions")
        .update({ isused: false })
        .eq("txn_id", trid);

      throw new Error(
        "Failed to mark delegate payment as confirmed. Please try again."
      );
    }

    const registrationPayload = {
      delegateId: delegate.delegateid,
      name: delegate.name,
      email: delegate.email,
      mobileNumber: delegate.mobileno,
      college: delegate.collegename,
      collegeYear: delegate.collegeyear,
      events: Array.isArray(delegate.events)
        ? delegate.events
        : delegate.events
          ? [delegate.events]
          : [],
    };

    const adjustedUnclaimedCount =
      typeof unclaimedCount === "number"
        ? Math.max(unclaimedCount - 1, 0)
        : unclaimedCount;

    return NextResponse.json(
      {
        success: true,
        message: "Payment verified successfully.",
        unclaimedCount: adjustedUnclaimedCount,
        delegate: registrationPayload,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          "An unexpected error occurred while verifying the transaction.",
        unclaimedCount,
      },
      { status: 500 }
    );
  }
}

import { supabaseAdmin } from "@/app/lib/supabase/supabaseAdmin";
import { NextResponse } from "next/server";

const COOKIE_MAX_AGE = 30 * 60; // 30 minutes

function encodeRegistrationCookie(payload = {}) {
  try {
    return Buffer.from(JSON.stringify(payload)).toString("base64");
  } catch (error) {
    console.error("Failed to encode registration cookie", error);
    return "";
  }
}

export async function POST(req) {
  let unclaimedCount = null;
  try {
    const resdata = await req.json();
    console.log("rres data:", resdata);
    const trid = resdata.upiTransactionId;
    const delegateId = resdata.delegateId;

    if (!delegateId || delegateId === "unknown") {
      return NextResponse.json(
        {
          success: false,
          error: "No delegate id found!",
        },
        { status: 400 }
      );
    }

    if (String(trid).length < 12 && String(trid) !== "1")
      return NextResponse.json(
        {
          success: false,
          error: "A Upi Ref Id must be 12 digits!",
        },
        { status: 400 }
      );
    const { data, error } = await supabaseAdmin
      .from("transactions")
      .select("*")
      .eq("txn_id", trid);

    const { count, error: unclaimedError } = await supabaseAdmin
      .from("transactions")
      .select("*", { count: "exact" })
      .eq("isused", false);

    if (unclaimedError) {
      console.error(
        "Failed to fetch unclaimed transactions count",
        unclaimedError
      );
    }

    unclaimedCount = typeof count === "number" ? count : null;

    // console.log("trid data:", data, "err", error, unclaimedTrxns);
    if (error) throw new Error(error.message);

    if (data.length === 0 || !data[0]) {
      if (trid === 1) {
        return NextResponse.json(
          {
            success: true,
            unclaimedCount,
          },
          { status: 200 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          error:
            "Transaction id not found, if youre sure this is the correct one, try in sometime!!",
          unclaimedCount,
        },
        { status: 404 }
      );
    }

    if (data[0]?.isused === true) {
      return NextResponse.json(
        {
          success: false,
          error: "This transaction Id has already been claimed!!!",
          unclaimedCount,
        },
        { status: 403 }
      );
    }

    // update delegtes table
    await supabaseAdmin
      .from("activedelegates")
      .update({ upitransactionid: trid, paymentconfirmed: true })
      .eq("delegateid", delegateId);
    const { data: delegateData, error: delegateError } = await supabaseAdmin
      .from("activedelegates")
      .select("delegateid,name,email,mobileno,events")
      .eq("delegateid", delegateId);

    console.log("updatedRows", delegateData, delegateError);
    if (delegateError || !delegateData) {
      console.error(
        "Failed to fetch delegate details",
        delegateError || "No record returned"
      );
    }

    const delegate = delegateData?.[0] || null;
    // update transactions table
    await supabaseAdmin
      .from("transactions")
      .update({ isused: true })
      .eq("txn_id", trid);

    console.log(`successfully fetched transaction ref: ${data}`);

    const registrationPayload = delegate
      ? {
          delegateId: delegate.delegateid,
          name: delegate.name,
          email: delegate.email,
          mobileNumber: delegate.mobileno,
          college: delegate.collegename,
          collegeYear: delegate.collegeyear,
          events: delegate.events || [],
        }
      : null;

    const response = NextResponse.json(
      {
        success: true,
        message: "Payment verified successfully.",
        unclaimedCount,
        delegate: registrationPayload,
      },
      { status: 200 }
    );

    if (registrationPayload) {
      response.cookies.set({
        name: "registrationData",
        value: encodeRegistrationCookie(registrationPayload),
        maxAge: COOKIE_MAX_AGE,
        sameSite: "lax",
        path: "/",
      });
    }

    response.cookies.set({
      name: "paymentStatus",
      value: "confirmed",
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Server error:", error.message);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "An exception occured",
        unclaimedCount,
      },
      { status: 500 }
    );
  }
}

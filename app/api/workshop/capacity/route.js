import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase/supabaseAdmin";
import { workshopDayCapacities } from "@/app/lib/registrationConfig";

const TABLE = "workshop_delegates";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const day = (searchParams.get("day") || "").trim();

  const dayConfig = workshopDayCapacities.find(({ value }) => value === day);
  if (!dayConfig) {
    return NextResponse.json(
      { success: false, message: "Invalid workshop day." },
      { status: 400 }
    );
  }

  const { error, count } = await supabaseAdmin
    .from(TABLE)
    .select("delegateid", { head: true, count: "exact" })
    .eq("daychosen", day)
    .or("paymentconfirmed.eq.true,screenshotbucketpath.not.is.null");

  if (error) {
    console.error("Workshop capacity check failed", error);
    return NextResponse.json(
      { success: false, message: "Unable to check capacity." },
      { status: 500 }
    );
  }

  const limit = dayConfig.limit ?? Infinity;
  const currentCount = typeof count === "number" ? count : 0;
  const remaining = Math.max(0, limit - currentCount);

  return NextResponse.json({
    success: true,
    limit,
    count: currentCount,
    remaining,
    full: currentCount >= limit,
  });
}

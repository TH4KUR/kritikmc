import { supabaseAdmin } from "@/app/lib/supabase/supabaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { data: records, error } = await supabaseAdmin
      .from("activedelegates")
      .select("*");

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, records });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

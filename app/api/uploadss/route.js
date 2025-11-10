import { supabaseAdmin } from "@/app/lib/supabase/supabaseAdmin";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const delegateId =
      cookies().get("delegateid").value || formData.get("delegateid");
    console.log("delegate id:", delegateId);
    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    if (!delegateId) {
      return NextResponse.json(
        { success: false, error: "No delegate ID provided" },
        { status: 400 }
      );
    }

    const { data: delegateData, error: delegateError } = await supabaseAdmin
      .from("activedelegates")
      .select("*")
      .eq("delegateid", delegateId);

    console.log("delagete data:", delegateData);
    // Validate user
    if (delegateData.length == 0) {
      return NextResponse.json(
        { success: false, error: "Improper delegate id, retry registration!" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, error: "Please upload an image file" },
        { status: 400 }
      );
    }

    // Validate file size (max 4MB)
    if (file.size > 4 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "File size must be less than 4MB" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique file name
    const fileExt = file.name.split(".").pop();
    const fileName = `${delegateId}-paymentSS.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload to Supabase Storage using admin client
    const { data, error: uploadError } = await supabaseAdmin.storage
      .from("paymentss")
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json(
        { success: false, error: uploadError.message },
        { status: 500 }
      );
    }

    // upate bucket path in table

    await supabaseAdmin
      .from("activedelegates")
      .update({
        screenshotbucketpath: `paymentss/${filePath}`,
        paymentss: `paymentss/${filePath}`,
      })
      .eq("delegateid", delegateId);

    // Get public URL
    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from("paymentss").getPublicUrl(filePath);

    const delegate = delegateData?.[0]
      ? {
          delegateId: delegateData[0].delegateid,
          name: delegateData[0].name,
          email: delegateData[0].email,
          mobileNumber: delegateData[0].mobileno,
          college: delegateData[0].collegename,
          collegeYear: delegateData[0].collegeyear,
          events: delegateData[0].events || [],
        }
      : null;

    const response = NextResponse.json({
      success: true,
      url: publicUrl,
      path: filePath,
      delegate,
      paymentStatus: "pending",
    });

    if (delegate) {
      response.cookies.set({
        name: "registrationData",
        value: Buffer.from(JSON.stringify(delegate)).toString("base64"),
        maxAge: 30 * 60,
        sameSite: "lax",
        path: "/",
      });
    }

    response.cookies.set({
      name: "paymentStatus",
      value: "pending",
      maxAge: 30 * 60,
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}

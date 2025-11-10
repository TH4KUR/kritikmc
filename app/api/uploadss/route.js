import { supabaseAdmin } from "@/app/lib/supabase/supabaseAdmin";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const delegateId = formData.get("delegateId");
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
    const fileExt = (
      file.name?.split(".").pop() ||
      file.type.split("/")[1] ||
      "png"
    ).toLowerCase();

    const existingPathRaw = delegateData?.[0]?.screenshotbucketpath || "";
    const normalisedExistingPath = existingPathRaw.startsWith("http")
      ? ""
      : existingPathRaw.replace(/^paymentss\//, "").replace(/^\//, "");

    const existingBase = normalisedExistingPath
      ? normalisedExistingPath.replace(/\.[^/.]+$/, "")
      : "";

    const uniqueSuffix = randomUUID();
    const fileName = existingBase
      ? `${existingBase}.${fileExt}`
      : `${delegateId}-paymentSS-${uniqueSuffix}.${fileExt}`;
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

    // Get public URL
    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from("paymentss").getPublicUrl(filePath);

    // update bucket path + permanent link in table
    await supabaseAdmin
      .from("activedelegates")
      .update({
        screenshotbucketpath: filePath,
        paymentss: publicUrl,
      })
      .eq("delegateid", delegateId);

    if (delegateData?.[0]) {
      delegateData[0].screenshotbucketpath = filePath;
      delegateData[0].paymentss = publicUrl;
    }

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

    return NextResponse.json({
      success: true,
      url: publicUrl,
      path: filePath,
      delegate,
      paymentStatus: "pending",
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}

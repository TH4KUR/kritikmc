import { SHA256 } from "crypto-js";
import { cookies } from "next/headers";
import axios from "axios";
import student from "@/models/Student";
import connectDB from "@/app/lib/connectDB";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    await connectDB();

    const regCookie = cookies().get("registrationData").value;
    const regData = JSON.parse(Buffer.from(regCookie, "base64").toString());

    const st =
      `/pg/v1/status/${"PGTESTPAYUAT86"}/${regData.transactionId}` +
      "96434309-7796-489d-8924-ab56988a6076";
    const dataSha256 = SHA256(st);
    const checksum = dataSha256 + "###" + "1";
    const options = {
      method: "GET",
      url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${"PGTESTPAYUAT86"}/${regData.transactionId}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": "PGTESTPAYUAT86",
      },
    };
    const response = await axios.request(options);
    if (
      response.data.code === "PAYMENT_SUCCESS" &&
      response.data.data.merchantTransactionId === regData.transactionId
    ) {
      const studentData = new student({
        name: regData.studentName,
        email: regData.studentEmail,
        mobileno: Number(regData.studentNumber),
        collegeYear: Number(regData.collegeYear),
        collegeName: regData.studentCollege,
        isKmcStudent: regData.isKmcStudent === "true" ? true : false,
        transactionId: regData.transactionId,
        events: regData.events,
      });
      let resMongo = await studentData.save();
      return NextResponse.redirect(`${process.env.HOST_URL}/success`, {
        status: 301,
      });
    } else if (response.code === `PAYMENT_FAILED`) {
      return NextResponse.redirect(`${process.env.HOST_URL}/failed`, {
        status: 301,
      });
    } else {
      return NextResponse.json(response.data);
    }
  } catch (err) {
    if (
      err.message === "Cannot read properties of undefined (reading 'value')"
    ) {
      return new Response(`BAD REQUEST: COOKIE EXPIRED`, { status: 400 });
    } else if (err.message.includes("duplicate key error")) {
      return new Response(
        `BAD REQUEST: Duplicate Transaction ID detected!! Retry`,
        { status: 400 }
      );
    } else {
      console.log(err);
      return new Response(`BAD REQUEST: ${err.message}`, { status: 400 });
    }
  }
}

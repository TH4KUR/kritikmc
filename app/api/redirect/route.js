import { SHA256 } from "crypto-js";
import { cookies } from "next/headers";
import axios from "axios";
import { db } from "@vercel/postgres";

export async function POST(req, res) {
  const data = await req.formData();
  let resBuilder = "";
  for (let [key, value] of data.entries()) {
    resBuilder += `${key}:${value}\n`;
  }
  const regCookie = cookies().get("registrationData").value;
  const regData = JSON.parse(Buffer.from(regCookie, "base64").toString());

  const st =
    `/pg/v1/status/${"PGTESTPAYUAT86"}/${regData.transactionId}` +
    "96434309-7796-489d-8924-ab56988a6076";
  // console.log(st)
  const dataSha256 = SHA256(st);

  const checksum = dataSha256 + "###" + "1";
  console.log(checksum);

  const options = {
    method: "GET",
    url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${"PGTESTPAYUAT86"}/${regData.transactionId}`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
      "X-MERCHANT-ID": `${"PGTESTPAYUAT86"}`,
    },
  };
  const response = await axios.request(options);
  console.log("r===", response.data);
  if (
    response.code === "PAYMENT_SUCCESS" &&
    response.data.merchantTransactionId === regData.transactionId
  ) {
    console.log("payment was successfull");
  } else if (response.code === "PAYMENT_FAILED") {
    console.log("payment FAILED");
  }

  return new Response(`Success:${resBuilder}\n\n}`);
}
export async function GET(req, res) {
  console.log("-------REQUEST----------");
  console.log(req);
  console.log("-------RESPONSE----------");
  console.log(res);
  console.log("-------CHEck body----------");
  return new Response("GET");
}

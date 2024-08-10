"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function formSubmit(formData) {
  // Deleting existing cookie
  cookies().delete("registrationData");
  cookies().delete("username");
  // const counterRes = await counter.up("kritikmc", "delegates");

  const rawFormData = {
    studentName: formData.get("student_name"),
    studentNumber: formData.get("student_number"),
    studentEmail: formData.get("student_email"),
    collegeYear: formData.get("college_year"),
    isKmcStudent: formData.get("kmc_student") === "true" ? "true" : "false",
    kmcRollNo: formData.get("kmc_rollno"),
    isPgStudent: formData.get("is_pg_student"),
    studentCollege: formData?.get("college_name") || "Kakatiya Medical College",
    events: [
      ...(formData.get("debate") ? ["debate"] : []),
      ...(formData.get("jeopardy") ? ["jeopardy"] : []),
      ...(formData.get("medExhibition") ? ["medExhibition"] : []),
      ...(formData.get("paperPresentation") ? ["paperPresentation"] : []),
      ...(formData.get("posterPresentation") ? ["posterPresentation"] : []),
      ...(formData.get("symposium") ? ["symposium"] : []),
      ...(formData.get("hackathon") ? ["hackathon"] : []),
    ],
  };
  const rawFormDataBase64 = Buffer.from(JSON.stringify(rawFormData)).toString(
    "base64"
  );

  // const reqData = {
  //   merchantId: "PGTESTPAYUAT86",
  //   merchantTransactionId: transactionId,
  //   merchantUserId: "MUID123",
  //   amount: formData.get("kmc_student") !== null ? 30000 : 40000,
  //   redirectUrl: `${process.env.HOST_URL}/api/redirect`,
  //   redirectMode: "POST",
  //   callbackUrl: `${process.env.HOST_URL}/api/redirect`,
  //   mobileNumber: "9999999999",
  //   paymentInstrument: {
  //     type: "PAY_PAGE",
  //   },
  // };

  // const reqDataJSON = JSON.stringify(reqData);
  // const reqDataBase64 = Buffer.from(reqDataJSON).toString("base64");
  // const reqDataSha256 = SHA256(
  //   reqDataBase64 + "/pg/v1/pay" + "96434309-7796-489d-8924-ab56988a6076"
  // );
  // const xVeriify = reqDataSha256 + "###" + "1";

  // const response = await axios.post(
  //   `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay`,
  //   {
  //     request: reqDataBase64,
  //     mydata: rawFormData,
  //   },
  //   {
  //     headers: {
  //       accept: "application/json",
  //       "Content-Type": "application/json",
  //       "X-VERIFY": xVeriify,
  //     },
  //   }
  // );
  // const redirectUrl = response.data.data.instrumentResponse.redirectInfo.url;

  cookies().set({
    name: "username",
    value: formData.get("student_name").split(" ")[0],
    secure: true,
    expires: Date.now() + 30 * 60 * 1000,
  });
  cookies().set({
    name: "registrationData",
    value: rawFormDataBase64,
    secure: true,
    expires: Date.now() + 30 * 60 * 1000,
  });

  redirect(`${process.env.HOST_URL}/payment`);
}

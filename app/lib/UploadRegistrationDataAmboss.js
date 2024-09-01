import connectDB from "@/app/lib/connectDB";
import ambossDelegate from "@/models/ambossDelegates";

export async function UploadRegistrationDataAmboss(regData, imgurl) {
  try {
    await connectDB();
    const ambossDelegateData = new ambossDelegate({
      delegateId: regData.delegateId,
      name: regData.studentName,
      email: regData.studentEmail,
      mobileno: Number(regData.studentNumber),
      collegeYear: Number(regData.collegeYear),
      collegeName: regData.studentCollege,
      isKmcStudent: regData.isKmcStudent === "true" ? true : false,
      isPgStudent: regData.isPgStudent === "true" ? true : false,
      kmcRollNo: regData.kmcRollNo,
      screenshotLink: imgurl,
    });
    console.log("Uploading data:", ambossDelegateData);
    let resMongo = await ambossDelegateData.save();
    return resMongo;
  } catch (err) {
    console.log(err);
    return err.message;
  }
}

import passiveDelegate from "@/models/PassiveDelegates";
import connectDB from "@/app/lib/connectDB";

export async function UploadRegistrationDataPassive(regData, imgurl) {
  try {
    await connectDB();
    const passiveDelegateData = new passiveDelegate({
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
    console.log("Uploading data:", passiveDelegateData);
    let resMongo = await passiveDelegateData.save();
    return resMongo;
  } catch (err) {
    console.log(err);
    return err.message;
  }
}

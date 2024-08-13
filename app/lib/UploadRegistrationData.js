import student from "@/models/Student";
import connectDB from "@/app/lib/connectDB";

export async function UploadRegistrationData(regData, imgurl) {
  await connectDB();
  console.log(imgurl);
  const studentData = new student({
    delegateId: regData.delegateId,
    name: regData.studentName,
    email: regData.studentEmail,
    mobileno: Number(regData.studentNumber),
    collegeYear: Number(regData.collegeYear),
    collegeName: regData.studentCollege,
    isKmcStudent: regData.isKmcStudent === "true" ? true : false,
    isPgStudent: regData.isPgStudent === "true" ? true : false,
    kmcRollNo: regData.kmcRollNo,
    events: regData.events,
    screenshotLink: imgurl,
  });
  console.log("Uploading data:", studentData);
  let resMongo = await studentData.save();
  return resMongo;
}

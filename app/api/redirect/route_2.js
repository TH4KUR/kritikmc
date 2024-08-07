import connectDB from "@/app/lib/connectDB";

export async function POST(req, res) {
  await connectDB();

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
}

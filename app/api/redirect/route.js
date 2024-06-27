export const dynamic = "force-dynamic";
export async function POST(req, res) {
  // console.log("-------REQUEST----------");
  // console.log(req);
  // console.log("-------RESPONSE----------");
  // console.log(res);
  // console.log("-------CHEck body----------");
  // const data = await req.formData();
  // console.log(data);
  return new Response("Hello, POST");
}
export async function GET(req, res) {
  // console.log("-------REQUEST----------");
  // console.log(req);
  // console.log("-------RESPONSE----------");
  // console.log(res);
  // console.log("-------CHEck body----------");
  // const data = await req.formData();
  // console.log(data);
  return new Response("Success");
}

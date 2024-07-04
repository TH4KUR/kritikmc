import { myClient } from "@/sanity";

async function getDeadlineData() {
  const res = await myClient.fetch(`*[_type=='siteSettings']{deadline}`);
  return res[0].deadline;
}

export default getDeadlineData;

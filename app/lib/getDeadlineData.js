import { sanityFetch } from "@/sanity";

async function getDeadlineData() {
  const res = await sanityFetch({
    query: `*[_type=='siteSettings']{deadline}`,
  });
  return res[0].deadline;
}

export default getDeadlineData;

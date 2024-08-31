import { sanityAnnouncementFetch } from "@/sanity";

async function getDeadlineData() {
  const res = await sanityAnnouncementFetch({
    query: `*[_type=='siteSettings']{deadline}`,
  });
  return res[0].deadline;
}

export default getDeadlineData;

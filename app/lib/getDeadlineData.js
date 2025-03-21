import { sanityAnnouncementFetch } from "@/sanity";

async function getDeadlineData() {
  const res = await sanityAnnouncementFetch({
    query: `*[_type=='siteSettings']{deadline, showTimer,registrationStart}`,
  });
  console.log(res[0].deadline);
  return {
    deadline: new Date(res[0].deadline),
    showTimer: res[0].showTimer == "true" ? true : false,
    registrationStart: new Date(res[0].registrationStart),
  };
}

export default getDeadlineData;

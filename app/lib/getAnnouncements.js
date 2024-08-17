import { sanityAnnouncementFetch } from "@/sanity";

async function getAnnouncements() {
  const res = await sanityAnnouncementFetch({
    query: `*[_type=="announcements"]{text,link,_createdAt} | order(_createdAt desc)`,
  });
  return res;
}

export default getAnnouncements;

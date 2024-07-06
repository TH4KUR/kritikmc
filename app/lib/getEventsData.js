import { sanityFetch } from "@/sanity";
export default async function getEventsData() {
  const res = await sanityFetch({
    query: `*[_type=="events" && !(eventName in ["Working Lunch","Guest Lecture - 1","Guest Lecture - 2","Prize Distribution","Inauguration Ceremony"])]{eventName,eventImg,eventDesc,eventSlogan,eventCoordinator,eventCoordinatorContact}`,
  });
  return res;
}

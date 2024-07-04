import { myClient } from "@/sanity";
export default async function getEventsData() {
  const res = await myClient.fetch(
    `*[_type=="events" && !(eventName in ["Working Lunch","Guest Lecture - 1","Guest Lecture - 2"])]{eventName,eventImg,eventDesc,eventSlogan,eventCoordinator,eventCoordinatorContact}`
  );
  return res;
}

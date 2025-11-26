import { sanityFetch } from "@/sanity";

const slugOverrides = {
  Debate: "debate",
  "Med Exhibition": "medExhibition",
  "Paper Presentation": "paperPresentation",
  "Poster Presentation": "posterPresentation",
  "Marrow's Jeopardy": "jeopardy",
  Hackathon: "hackathon",
  Symposium: "symposium",
};

const fallbackSlug = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+([a-z0-9])/g, (_, char) => char.toUpperCase())
    .replace(/[^a-z0-9]/g, "");

export default async function getEventsData() {
  const res = await sanityFetch({
    query: `*[_type=="events" && !(eventName in ["Working Lunch","Guest Lecture - 1","Guest Lecture - 2","Prize Distribution","Inauguration Ceremony", "Debate"])]{eventName,eventImg,eventDesc,eventSlogan,eventCoordinator,eventCoordinatorContact}`,
  });

  return res.map((event) => ({
    ...event,
    eventSlug: slugOverrides[event.eventName] ?? fallbackSlug(event.eventName),
  }));
}

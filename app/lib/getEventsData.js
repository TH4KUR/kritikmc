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
    query: `*[_type=="events" && !(eventName in ["Working Lunch","Guest Lecture - 1","Guest Lecture - 2","Prize Distribution","Inauguration Ceremony", "Debate"])]{eventName,eventImg,eventDesc,eventSlogan,eventCoordinator,eventCoordinatorContact,kmcExclusive,pgsAllowed,"slug":slug.current}`,
  });

  return res.map((event) => ({
    ...event,
    eventSlug:
      event.slug ??
      slugOverrides[event.eventName] ??
      fallbackSlug(event.eventName),
    kmcExclusive: Boolean(event.kmcExclusive),
    pgsAllowed: Boolean(event.pgsAllowed),
  }));
}

export async function getEventBySlug(slug) {
  const res = await sanityFetch({
    query: `*[_type == 'events' && slug.current == $slug][0]{
      eventName,
      "slug": slug.current,
      eventSlogan,
      eventDesc,
      eventImg,
      rules,
      prizes,
      contacts
    }`,
    params: { slug },
  });

  return res;
}

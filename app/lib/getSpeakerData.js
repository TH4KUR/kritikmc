import { sanityFetch } from "@/sanity";

export default async function getSpeakerData() {
  const speakerQuery = `*[_type=='speakers']{speakername,speakertype,speakerimg,speakerdesc} | order(speakertype asc)`;
  const data = await sanityFetch({ query: speakerQuery });
  return data;
}

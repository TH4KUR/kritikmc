import { sanityFetch } from "@/sanity";

export default async function getSpeakerData() {
  const speakerQuery = `*[_type=='speakers']{speakername,speakertype,speakerimg,speakerdesc} | order(speakername desc) | order(speakertype asc)`; // Very specific to the clients needs
  const data = await sanityFetch({ query: speakerQuery });
  return data;
}

import { sanityFetch } from "@/sanity";

export default async function getPatronData() {
  const speakerQuery = `*[_type=='patron']{patronname,patrontype,patronimg,patrondesc} | order(patronname desc) | order(patrontype asc)`; // Very specific to the clients needs
  const data = await sanityFetch({ query: speakerQuery });
  return data;
}

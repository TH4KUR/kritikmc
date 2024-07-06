import { sanityFetch } from "@/sanity";

export default async function getResgistrationDates() {
  const query = `*[_type == 'siteSettings']{registrationStart,registrationEnd}`;
  const data = await sanityFetch({ query });
  return data[0];
}

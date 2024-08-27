import { sanityFetch } from "@/sanity";

async function getTestimonials() {
  const res = await sanityFetch({
    query: `*[_type=='testimonials']{studentName,collegeName,testimonialText}`,
  });
  return res;
}

export default getTestimonials;

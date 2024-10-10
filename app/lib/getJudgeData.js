import { sanityFetch } from "@/sanity";

export default async function getJudgeData() {
  const speakerQuery = `*[_type=='judges']{judgename,judgeimg,judgedesc}`;
  const data = await sanityFetch({ query: speakerQuery });
  return data;
}

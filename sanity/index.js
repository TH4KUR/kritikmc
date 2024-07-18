import { createClient } from "@sanity/client";
import { dataset, projectId } from "./env";
export const myClient = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: "2024-06-12",
});
export async function sanityFetch({ query, params = {}, tags }) {
  return myClient.fetch(query, params, {
    next: {
      revalidate: process.env.NODE_ENV === "development" ? 30 : 1800,
      tags,
    },
  });
}

import { createClient } from "@sanity/client";
import { dataset, projectId } from "./env";
export const myClient = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: "2024-06-12",
});

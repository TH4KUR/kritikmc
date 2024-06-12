import { createClient } from "@sanity/client";
import { dataset, projectId } from "./env";
export const sanity = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: "2024-06-12",
});

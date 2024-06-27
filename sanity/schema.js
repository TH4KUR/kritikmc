import { blockContent } from "./schemaTypes/blockContent";
import { category } from "./schemaTypes/category";
import { post } from "./schemaTypes/post";
import { author } from "./schemaTypes/author";
import { deadline } from "./schemaTypes/deadline";
import { siteSettings } from "./schemaTypes/siteSettings";
import { speakers } from "./schemaTypes/speakers";
import { events } from "./schemaTypes/events";
import { eventPlan } from "./schemaTypes/eventPlan";

export const schema = {
  types: [
    post,
    author,
    category,
    blockContent,
    deadline,
    siteSettings,
    speakers,
    events,
    eventPlan,
  ],
};

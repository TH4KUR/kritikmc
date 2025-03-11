import { blockContent } from "./schemaTypes/blockContent";
import { siteSettings } from "./schemaTypes/siteSettings";
import { speakers } from "./schemaTypes/speakers";
import { events } from "./schemaTypes/events";
import { eventPlan } from "./schemaTypes/eventPlan";
import { conferenceBreakdown } from "./schemaTypes/conferenceBreakdown";
import { announcements } from "./schemaTypes/announcements";
import { testimonial } from "./schemaTypes/testimonial";
import { patrons } from "./schemaTypes/patrons";
import { judges } from "./schemaTypes/judges";
import { archives } from "./schemaTypes/archives";

export const schema = {
  types: [
    blockContent,
    siteSettings,
    speakers,
    events,
    eventPlan,
    conferenceBreakdown,
    announcements,
    testimonial,
    patrons,
    judges,
    archives,
  ],
};

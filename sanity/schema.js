import { blockContent } from "./schemaTypes/blockContent";
import { siteSettings } from "./schemaTypes/siteSettings";
import { speakers } from "./schemaTypes/speakers";
import { events } from "./schemaTypes/events";
import { eventPlan } from "./schemaTypes/eventPlan";
import { conferenceBreakdown } from "./schemaTypes/conferenceBreakdown";
import { announcements } from "./schemaTypes/announcements";
import { testimonial } from "./schemaTypes/testimonial";

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
  ],
};

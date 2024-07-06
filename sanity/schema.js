import { blockContent } from "./schemaTypes/blockContent";
import { siteSettings } from "./schemaTypes/siteSettings";
import { speakers } from "./schemaTypes/speakers";
import { events } from "./schemaTypes/events";
import { eventPlan } from "./schemaTypes/eventPlan";
import { conferenceBreakdown } from "./schemaTypes/conferenceBreakdown";

export const schema = {
  types: [
    blockContent,
    siteSettings,
    speakers,
    events,
    eventPlan,
    conferenceBreakdown,
  ],
};

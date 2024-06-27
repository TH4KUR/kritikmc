import { defineField, defineType } from "sanity";

export const eventPlan = defineType({
  name: "eventPlan",
  title: "Event Timings Breakdown",
  type: "document",
  fields: [
    defineField({
      name: "postNriLunch",
      title: "Post NRI lunch?",
      description:
        "Tick yes if definite timing is relative to when NRI lunch ends.",
      type: "string",
      options: { list: ["Yes", "No"], layout: "radio" },
      validation: (rule) => rule.required().error("Please select one option."),
    }),
    defineField({
      name: "startTime",
      title: "Start time for the event",
      description: "Select the exact time the event will start.",
      type: "datetime",
      hidden: ({ parent, value }) => !value && parent?.postNriLunch === "Yes",
      validation: (rule) =>
        rule.required().error("An event start time is required!"),
    }),
    defineField({
      name: "endTime",
      title: "End time for the event",
      description: "Select the exact time the event will end.",
      type: "datetime",
      hidden: ({ parent, value }) => !value && parent?.postNriLunch === "Yes",
      validation: (rule) =>
        rule.required().error("An event end time is required!"),
    }),
    defineField({
      name: "events",
      title: "Events for the above time slot.",
      description: "Select the exact time the event will start.",
      type: "array",
      of: [{ name: "event", type: "string", title: "Event" }],
      validation: (rule) =>
        rule.required().error("Atleast one event per time-slot is required!"),
    }),
  ],
});

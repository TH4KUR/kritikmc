import { defineField, defineType } from "sanity";

export const eventPlan = defineType({
  name: "eventPlan",
  title: "Event Timings Breakdown",
  type: "document",
  fields: [
    defineField({
      name: "cardTitle",
      title: "Card Title",
      description:
        "Mention the time slot here too, so that it is easier to organize data for you.",
      placeholder: "09:30 - 12:30",
      initialValue: "09:30 - 12:30",
      type: "string",
      validation: (rule) => rule.required().error("Please fill this field."),
    }),
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
      options: { timeStep: 15 },
      hidden: ({ parent, value }) => !value && parent?.postNriLunch === "Yes",
      validation: (rule) =>
        rule.custom((value, context) => {
          if (value && context?.document?.postNriLunch == "Yes") {
            return "Please Clear this field";
          } else if (!value && context?.document?.postNriLunch == "No") {
            return "An event end time is required";
          }
          return true;
        }),
    }),
    defineField({
      name: "endTime",
      title: "End time for the event",
      description: "Select the exact time the event will end.",
      type: "datetime",
      options: { timeStep: 15 },
      hidden: ({ parent, value }) => !value && parent?.postNriLunch === "Yes",
      validation: (rule) =>
        rule.custom((value, context) => {
          if (value && context?.document?.postNriLunch === "Yes") {
            return "Please Clear this field";
          } else if (!value && context?.document?.postNriLunch === "No") {
            return "An event end time is required";
          } else {
            return true;
          }
        }),
    }),
    defineField({
      name: "events",
      title: "Events for the above time slot.",
      description: "Select the exact time the event will start.",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "events" },
        },
      ],
      validation: (rule) =>
        rule.required().error("Atleast one event per time-slot is required!"),
    }),
  ],
});

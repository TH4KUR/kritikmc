import { defineField, defineType } from "sanity";

export const conferenceBreakdown = defineType({
  name: "conferenceBreakdown",
  title: "Kriti. Timings Breakdown",
  type: "document",
  fields: [
    defineField({
      name: "conferenceDay",
      title: "Event Day",
      description: "Only enter in the example format below.",
      type: "string",
      placeholder: "Day 1",
      initialValue: "Day 1",
      validation: (rule) =>
        rule.custom((value) => {
          if (
            value.split(" ")[0] === "Day" &&
            ["1", "2", "3", "4"].includes(value.split(" ")[1])
          ) {
            return true;
          } else {
            return "Please enter data in requested format! (Only accepts days upto 4)";
          }
        }),
    }),
    defineField({
      name: "conferenceDate",
      title: "Event Day",
      description: "Select the date of the above mentioned conference day.",
      type: "date",
      validation: (rule) => rule.required().error("Please select a date."),
    }),

    defineField({
      name: "timeslots",
      title: "Add Details Per Timeslot below",
      type: "array",
      of: [
        {
          type: "eventPlan",
        },
      ],
      validation: (rule) =>
        rule.required().error("Atleast one event is required per day"),
    }),
  ],
});

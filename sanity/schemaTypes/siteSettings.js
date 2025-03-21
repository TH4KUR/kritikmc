import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      initialValue: "Site Settings",
      readOnly: true,
    }),
    defineField({
      name: "showTimer",
      title: "Show the timer on website?",
      description:
        "The functionality of opening/closing registration, on start/end datetime wont be affected.",
      type: "string",
      options: { list: ["true", "false"], layout: "radio" },
    }),
    defineField({
      title: "Timer Countdown DateTime",
      name: "deadline",
      type: "datetime",
      description: "Add the date,time the timer should count to.",
      validation: (rule) =>
        rule
          .required()
          .error("Required to display timer countdown on the website!"),
    }),
    defineField({
      title: "Registrations Start Date",
      name: "registrationStart",
      type: "date",
      description: "Add the registration start date.",
      validation: (rule) =>
        rule.required().error("Required to display data on the website!"),
    }),
    defineField({
      title: "Registrations End Date",
      name: "registrationEnd",
      type: "date",
      description: "Add the registration end date.",
      validation: (rule) =>
        rule.required().error("Required to display data on the website!"),
    }),
  ],
});

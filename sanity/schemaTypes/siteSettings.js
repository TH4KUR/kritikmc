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
      description:
        "Add the datetime the timer should count to (save in IST / Asia-Kolkata).",
      options: {
        timeStep: 15,
        timeZone: "Asia/Kolkata",
      },
      validation: (rule) =>
        rule
          .required()
          .error("Required to display timer countdown on the website!"),
    }),
    defineField({
      title: "Registrations Start DateTime",
      name: "registrationStart",
      type: "datetime",
      description:
        "Add the registration start date and time in IST (Asia-Kolkata).",
      options: {
        timeStep: 15,
        timeZone: "Asia/Kolkata",
      },
      validation: (rule) =>
        rule.required().error("Required to display data on the website!"),
    }),
    defineField({
      title: "Registrations End DateTime",
      name: "registrationEnd",
      type: "datetime",
      description:
        "Add the registration end date and time in IST (Asia-Kolkata).",
      options: {
        timeStep: 15,
        timeZone: "Asia/Kolkata",
      },
      validation: (rule) =>
        rule.required().error("Required to display data on the website!"),
    }),
  ],
});

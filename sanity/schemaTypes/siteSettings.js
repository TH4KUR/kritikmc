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
      name: "deadline",
      type: "datetime",
      description:
        "Add the date,time the timer should count to. NOTE: Make sure only 1 Timer is active.",
      validation: (rule) =>
        rule
          .required()
          .error("Required to display timer countdown on the website!"),
    }),
  ],
});

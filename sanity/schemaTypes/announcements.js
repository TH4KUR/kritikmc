import { defineField, defineType } from "sanity";

export const announcements = defineType({
  name: "announcements",
  title: "Announcements",
  type: "document",
  fields: [
    defineField({
      name: "text",
      title: "Short announcement",
      type: "string",
      validation: (rule) => rule.required().error("An event name is required!"),
    }),
    defineField({
      name: "link",
      title: "Enter a link to show with the announcement mentioned above",
      type: "string",
    }),
  ],
});

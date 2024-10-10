import { defineType, defineField } from "sanity";
export const patrons = defineType({
  name: "patron",
  title: "Patrons",
  type: "document",
  fields: [
    defineField({
      name: "patronname",
      title: "Patrons's Full Name",
      type: "string",
      validation: (rule) => {
        rule.required().error("A name for the patron is required!");
      },
    }),
    defineField({
      name: "patrondesc",
      title: "Description Text for the patron (MAX:500 words)",
      type: "text",
      validation: (rule) => {
        rule
          .required()
          .error("A description of the patron is required!")
          .length(500)
          .error("Please shortern the description to 500 words!!");
      },
    }),
    defineField({
      name: "patronimg",
      title: "An image of the patron (webp)",
      type: "image",
      validation: (rule) => {
        rule.required().error("A .webp image is required!");
      },
      options: {
        accept: "image/webp",
      },
    }),
  ],
});

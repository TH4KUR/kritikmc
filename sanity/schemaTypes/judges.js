import { defineType, defineField } from "sanity";
export const judges = defineType({
  name: "judges",
  title: "Judges",
  type: "document",
  fields: [
    defineField({
      name: "judgename",
      title: "Judges's Full Name",
      type: "string",
      validation: (rule) => {
        rule.required().error("A name for the judge is required!");
      },
    }),
    defineField({
      name: "judgedesc",
      title: "Description Text for the speaker (MAX:500 words)",
      type: "text",
      validation: (rule) => {
        rule
          .required()
          .error("A description of the judge is required!")
          .length(500)
          .error("Please shortern the description to 500 words!!");
      },
    }),
    defineField({
      name: "judgeimg",
      title: "An image of the judge (webp)",
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

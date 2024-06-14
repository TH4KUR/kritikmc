import { defineType, defineField } from "sanity";
export const speakers = defineType({
  name: "speakers",
  title: "Speakers",
  type: "document",
  fields: [
    defineField({
      name: "speakername",
      title: "Speaker's Full Name",
      type: "string",
      validation: (rule) => {
        rule.required().error("A name for the speaker is required!");
      },
    }),
    defineField({
      name: "speakertype",
      title: "Speaker Type",
      type: "string",
      options: { list: ["Chief Guest", "Guest Speaker"], layout: "radio" },
    }),
    defineField({
      name: "speakerdesc",
      title: "Description Text for the speaker",
      type: "text",
      validation: (rule) => {
        rule.required().error("A description of the speaker is required!");
      },
    }),
    defineField({
      name: "speakerimg",
      title: "An image of the speaker (webp)",
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

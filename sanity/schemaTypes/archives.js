import { defineField, defineType } from "sanity";

export const archives = defineType({
  name: "archives",
  title: "Archives Page",
  type: "document",
  fields: [
    defineField({
      name: "archivesName",
      title: "Archive Name",
      description: "Only enter in the format: 'Archives YYYY'.",
      type: "string",
      initialValue: "Archives 2023",
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return "This field is required!";
          if (!/^Archives \d{4}$/.test(value)) {
            return "Format must be 'Archives YYYY' (e.g., Archives 2023)";
          }
          return true;
        }),
    }),
    defineField({
      name: "archivesDesc",
      title: "Archive Description",
      description: "Text up to 100 words about the Kriti event.",
      type: "text",
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value) return "A description of the event is required!";
          const wordCount = value.split(/\s+/).length;
          if (wordCount > 100) {
            return "Please shorten the description to 100 words or fewer!";
          }
          return true;
        }),
    }),
    defineField({
      name: "archivesImgArr",
      title: "Images of the Event",
      type: "array",
      of: [
        {
          type: "image",
          fields: [
            defineField({
              name: "alt",
              title: "Alternative Text",
              type: "string",
              description: "Describe the image for accessibility.",
              validation: (rule) => rule.optional(), // ✅ Makes it optional
            }),
          ],
          options: {
            hotspot: true, // Enables cropping tool
          },
        },
      ],
      options: {
        layout: "grid",
        sortable: true, // Enables better UI for bulk uploads
      },
    }),
  ],
});

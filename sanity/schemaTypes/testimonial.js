import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonials",
  title: "Testimonials",
  type: "document",
  fields: [
    defineField({
      name: "studentName",
      title: "Testimonial by",
      description: "Enter The name of the person the testimonial is from",
      type: "string",
      validation: (rule) => rule.required().error("A name is required!"),
    }),

    defineField({
      name: "collegeName",
      title: "College Name",
      description: "Enter The name of the college the person is from",
      type: "string",
      validation: (rule) =>
        rule.required().error("The college name is required!"),
    }),

    defineField({
      name: "testimonialText",
      title: "Testimonial Paragraph",
      description:
        "A Short Testimonial (within 50 words, for best symmetry on website)",
      type: "text",
      validation: (rule) => rule.required().error("A testimonial is required!"),
    }),
  ],
});

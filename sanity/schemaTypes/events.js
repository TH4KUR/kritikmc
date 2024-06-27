import { defineField, defineType } from "sanity";

export const events = defineType({
  name: "events",
  title: "Events",
  type: "document",
  fields: [
    defineField({
      name: "eventName",
      title: "Event Name",
      type: "string",
      validation: (rule) => rule.required().error("An event name is required!"),
    }),
    defineField({
      name: "eventImg",
      title: "Event Image (Convert your image to WebP)",
      type: "image",
      validation: (rule) =>
        rule.required().error("An event image is required!"),
      options: {
        accept: "image/webp",
      },
    }),
    defineField({
      name: "eventDesc",
      title: "Event Description",
      type: "text",
      validation: (rule) =>
        rule.required().error("An event Description is required!"),
    }),
    defineField({
      name: "eventSlogan",
      title: "Event Slogan",
      type: "string",
      validation: (rule) =>
        rule.required().error("An event slogan is required!"),
    }),
    defineField({
      name: "eventCoordinator",
      title: "Event Coordinator",
      type: "string",
      validation: (rule) =>
        rule.required().error("An event coordinator is required!"),
    }),
    defineField({
      name: "eventCoordinatorContact",
      title: "Event Coordinator's Contact Number",
      type: "number",
      description: "Enter a ten-digit mobile number (omit country code)",
      validation: (rule) =>
        rule
          .required()
          .error("An event coordinator is required!")
          .greaterThan(6000000000)
          .error("Please enter a valid mobile number")
          .lessThan(10000000000)
          .error("Please enter a valid mobile number"),
    }),
  ],
});

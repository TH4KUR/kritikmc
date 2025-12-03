import { defineField, defineType } from "sanity";
// *[_type == 'conferenceBreakdown']{timeslots,"eventsRef":timeslots[].events[]->}
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
      name: "slug",
      title: "URL Slug",
      type: "slug",
      description:
        "Unique URL identifier for this event (e.g., 'poster-presentation')",
      options: {
        source: "eventName",
        maxLength: 96,
      },
      validation: (rule) =>
        rule.required().error("A slug is required for URL routing!"),
    }),
    defineField({
      name: "kmcExclusive",
      title: "KMC Exclusive",
      type: "boolean",
      description:
        "Enable when the event should only be selectable by current KMC students.",
      initialValue: false,
    }),
    defineField({
      name: "pgsAllowed",
      title: "Allow PG Delegates",
      type: "boolean",
      description:
        "Disable only when postgraduates should not be able to register for this event.",
      initialValue: true,
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
      name: "rules",
      title: "Event Rules",
      type: "blockContent",
      description:
        "Rich text editor for event rules, guidelines, and format details",
      validation: (rule) => rule.required().error("Event rules are required!"),
    }),
    defineField({
      name: "prizes",
      title: "Prize Information",
      type: "array",
      of: [{ type: "string" }],
      description:
        "List prizes in order (Winner, 1st Runner Up, 2nd Runner Up, etc.)",
    }),
    defineField({
      name: "contacts",
      title: "Event Contacts",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Contact Name",
              type: "string",
              validation: (rule) => rule.required(),
            },
            {
              name: "phone",
              title: "Contact Number",
              type: "string",
              description: "Enter a ten-digit mobile number",
              validation: (rule) =>
                rule
                  .required()
                  .regex(/^[6-9][0-9]{9}$/, {
                    name: "valid Indian mobile number",
                  })
                  .error("Please enter a valid 10-digit mobile number"),
            },
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "phone",
            },
          },
        },
      ],
      validation: (rule) =>
        rule.required().min(1).error("At least one contact is required!"),
    }),
  ],
  preview: {
    select: {
      title: "eventName",
      subtitle: "eventSlogan",
      media: "eventImg",
    },
  },
});

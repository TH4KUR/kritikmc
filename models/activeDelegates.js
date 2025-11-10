import { z } from "zod";

export const activeDelegates = z.object({
  delegateId: z.string().min(1, "Delegate ID is required"),
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  mobileno: z.string().regex(/^\+?\d{10}$/, "Mobile number must be 10 digits"),
  kmcRollNo: z.number().int().positive().optional(),
  collegeYear: z.number().int().min(1).max(10).optional(),
  isKmcStudent: z.boolean().default(false),
  isPgStudent: z.boolean().default(false),
  collegeName: z.string().optional(),
  events: z.array(z.string()).default([]),
  screenshotBucketPath: z.string().optional().nullable(),
});

// export type ActiveDelegates = z.infer<typeof activeDelegates>;
export const activeDelegatesFormData = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  mobileno: z.string().regex(/^\+?\d{10}$/, "Mobile number must be 10 digits"),
  kmcRollNo: z.number().int().positive().optional(),
  collegeYear: z.number().int().min(1).max(10).optional(),
  isKmcStudent: z.boolean().default(false),
  isPgStudent: z.boolean().default(false),
  collegeName: z.string().optional(),
  events: z.array(z.string()).default([]),
});

export const PendingConfirmationSchema = z.object({
  pendingId: z.uuid("Not a valid uuid"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  mobileno: z
    .string()
    .regex(/^\+?\d{10,15}$/, "Mobile number must be 10–15 digits"),

  kmcRollNo: z.number().int().positive().optional(),

  collegeYear: z.number().int().min(1).max(10).optional(),

  isKmcStudent: z.boolean().default(false),

  isPgStudent: z.boolean().default(false),

  collegeName: z.string().optional(),

  events: z.array(z.string()).default([]),

  screenshotBucketPath: z.string().optional().nullable(),

  type: z.string().min(1, "Type is required").optional(),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// export type ActiveDelegatesFormData = z.infer<typeof activeDelegatesFormData>;
// export type PendingConfirmation = z.infer<typeof PendingConfirmationSchema>;

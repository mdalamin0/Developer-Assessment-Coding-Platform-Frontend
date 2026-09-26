import { z } from "zod";

export const assessmentSchema = z
  .object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().optional(),
    duration: z.number().int().positive("Duration must be greater than 0"),
    passingMarks: z
      .number()
      .int()
      .positive("Passing marks must be greater than 0"),
    startAt: z.string().datetime("Start date and time is required"),
    endAt: z.string().datetime("End date and time is required"),
  })
  .refine((data) => new Date(data.startAt) < new Date(data.endAt), {
    message: "End time must be after start time",
    path: ["endAt"],
  });

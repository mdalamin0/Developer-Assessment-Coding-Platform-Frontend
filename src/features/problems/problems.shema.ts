import z from "zod";

export const createProblemSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  type: z.enum(["MCQ"]),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  marks: z.number().int().positive("Marks must be greater than 0"),
   options: z
    .array(z.string().min(1, "Option is required"))
    .length(4, "Exactly 4 options are required"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
});

export const updateProblemSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").optional(),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .optional(),
  type: z.enum(["MCQ", "WRITTEN", "CODING"]).optional(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]).optional(),
  marks: z.number().int().positive("Marks must be greater than 0").optional(),
  options: z.array(z.string()).optional(),
  correctAnswer: z.string().optional(),
});

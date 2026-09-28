import z from "zod";

export const candidateFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),

  contactNumber: z
    .string()
    .trim()
    .refine(
      (value) =>
        value === "" || /^(01[3-9]\d{8}|\+8801[3-9]\d{8})$/.test(value),
      "Enter a valid Bangladeshi mobile number",
    ),

  bio: z
    .string()
    .max(1000, "Bio must not exceed 1000 characters")
    .or(z.literal("")),

  skills: z.string().refine(
    (value) =>
      value
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean).length <= 50,
    "Cannot add more than 50 skills",
  ),

  experience: z
    .string()
    .refine(
      (value) =>
        value === "" ||
        (Number.isInteger(Number(value)) &&
          Number(value) >= 0 &&
          Number(value) <= 50),
      "Experience must be a whole number between 0 and 50",
    ),

  githubUrl: z.string().url("Invalid GitHub URL").or(z.literal("")),

  linkedinUrl: z.string().url("Invalid LinkedIn URL").or(z.literal("")),

  resume: z.instanceof(File).nullable(),
});

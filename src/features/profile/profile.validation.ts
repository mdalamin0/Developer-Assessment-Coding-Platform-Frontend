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

export const recruiterFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),

  companyName: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .max(150, "Company name must not exceed 150 characters"),

  companyWebsite: z
    .string()
    .trim()
    .url("Enter a valid company website URL")
    .or(z.literal("")),

  companyDescription: z
    .string()
    .max(1000, "Company description must not exceed 1000 characters")
    .or(z.literal("")),

  designation: z
    .string()
    .trim()
    .max(100, "Designation must not exceed 100 characters")
    .or(z.literal("")),

  companyLogo: z.instanceof(File).nullable(),
});

"use client";

import { useForm } from "@tanstack/react-form";
import { FetchError } from "ofetch";
import { useRef } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

import { useUpdateCandidateProfile } from "../hooks/profile.hooks";
import { candidateFormSchema } from "../profile.validation";
import { CandidateEditFormProps } from "../profile.types";
import { Upload } from "lucide-react";


const CandidateEditForm = ({
  name,
  email,
  contactNumber,
  bio,
  skills,
  experience,
  githubUrl,
  linkedinUrl,
  resumeUrl,
  onSuccess,
}: CandidateEditFormProps) => {
  const resumeInputRef = useRef<HTMLInputElement>(null);

  const { mutate: updateCandidateProfile, isPending } =
    useUpdateCandidateProfile();

  const form = useForm({
    defaultValues: {
      name: name || "",
      contactNumber: contactNumber || "",
      bio: bio || "",
      skills: skills.join(", "),
      experience: experience?.toString() || "",
      githubUrl: githubUrl || "",
      linkedinUrl: linkedinUrl || "",
      resume: null as File | null,
    },

    validators: {
      onSubmit: candidateFormSchema,
    },

    onSubmit: ({ value }) => {
      const skillsArray = value.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

      const formData = new FormData();

      formData.append(
        "data",
        JSON.stringify({
          name: value.name.trim(),
          contactNumber: value.contactNumber.trim(),
          bio: value.bio.trim(),
          skills: skillsArray,
          experience: value.experience ? Number(value.experience) : undefined,
          githubUrl: value.githubUrl.trim(),
          linkedinUrl: value.linkedinUrl.trim(),
        }),
      );

      if (value.resume) {
        formData.append("resume", value.resume);
      }

      updateCandidateProfile(formData, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.error(res.message || "Failed to update profile.");
            return;
          }

          toast.success(res.message || "Profile updated successfully.");

          onSuccess();
        },

        onError: (error: FetchError) => {
          const errorMessage =
            error?.data?.message ||
            error?.message ||
            "Failed to update profile.";

          toast.error(errorMessage);
        },
      });
    },
  });

  const handleResumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Resume must be smaller than 5MB.");
      event.target.value = "";
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please select a PDF or DOCX file.");
      event.target.value = "";
      return;
    }

    form.setFieldValue("resume", file);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        {/* Basic Information */}
        <div className="form-section">
          <div className="form-section-header">
            <h3 className="font-semibold">Basic Information</h3>
            <p className="text-sm text-muted-foreground">
              Update your basic account information.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <form.Field name="name">
              {(field) => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="Enter your full name"
                      aria-invalid={invalid}
                    />

                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>

            <Field>
              <FieldLabel htmlFor="candidate-email">Email</FieldLabel>

              <Input id="candidate-email" value={email} disabled readOnly />
            </Field>
          </div>
        </div>

        {/* Professional Information */}
        <div className="form-section">
          <div className="form-section-header">
            <h3 className="font-semibold">Professional Information</h3>

            <p className="text-sm text-muted-foreground">
              Tell recruiters about your professional background.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <form.Field name="contactNumber">
              {(field) => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel htmlFor={field.name}>Contact Number</FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="+8801XXXXXXXXX"
                      aria-invalid={invalid}
                    />

                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="experience">
              {(field) => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel htmlFor={field.name}>Experience</FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      min="0"
                      max="50"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="Years of experience"
                      aria-invalid={invalid}
                    />

                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          <form.Field name="bio">
            {(field) => {
              const invalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={invalid}>
                  <FieldLabel htmlFor={field.name}>Bio</FieldLabel>

                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Tell us a little about yourself..."
                    rows={5}
                    aria-invalid={invalid}
                  />

                  <div className="flex items-center justify-between">
                    {invalid ? (
                      <FieldError errors={field.state.meta.errors} />
                    ) : (
                      <span />
                    )}

                    <span className="text-xs text-muted-foreground">
                      {field.state.value.length}/1000
                    </span>
                  </div>
                </Field>
              );
            }}
          </form.Field>
        </div>

        {/* Skills */}
        <div className="form-section">
          

          <form.Field name="skills">
            {(field) => {
              const invalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={invalid}>
                  <FieldLabel htmlFor={field.name}>Technical Skills</FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="JavaScript, TypeScript, React, Node.js"
                    aria-invalid={invalid}
                  />

                  {invalid ? (
                    <FieldError errors={field.state.meta.errors} />
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Separate each skill with a comma (,).
                    </p>
                  )}
                </Field>
              );
            }}
          </form.Field>
        </div>

        {/* Social Links */}
        <div className="form-section">
          <div className="form-section-header">
            <h3 className="font-semibold">Social Links</h3>
            <p className="text-sm text-muted-foreground">
              Add links to your developer profiles.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <form.Field name="githubUrl">
              {(field) => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel htmlFor={field.name}>GitHub URL</FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      type="url"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="https://github.com/username"
                      aria-invalid={invalid}
                    />

                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="linkedinUrl">
              {(field) => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel htmlFor={field.name}>LinkedIn URL</FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      type="url"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="https://linkedin.com/in/username"
                      aria-invalid={invalid}
                    />

                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>
          </div>
        </div>

        {/* Resume */}
        <div className="form-section">
          <div className="form-section-header">
            <h3 className="font-semibold">Resume</h3>
            <p className="text-sm text-muted-foreground">
              Upload your latest resume. PDF or DOCX, maximum 5MB.
            </p>
          </div>

          <form.Field name="resume">
            {(field) => (
              <Field>
                <FieldLabel>Resume</FieldLabel>

                <button
                  type="button"
                  onClick={() => resumeInputRef.current?.click()}
                  className="group flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 px-6 py-8 text-center transition-colors hover:border-primary/50 hover:bg-primary/5"
                >
                  <div className="mb-3 flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                    <Upload className="size-5" />
                  </div>

                  <p className="text-sm font-medium">
                    {field.state.value
                      ? field.state.value.name
                      : "Click to upload your resume"}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    PDF or DOCX · Maximum 5MB
                  </p>

                  {field.state.value && (
                    <p className="mt-3 text-xs font-medium text-primary">
                      New resume selected
                    </p>
                  )}

                  {!field.state.value && resumeUrl && (
                    <p className="mt-3 text-xs text-muted-foreground">
                      Current resume is already uploaded. Select a new file to
                      replace it.
                    </p>
                  )}
                </button>

                <Input
                  ref={resumeInputRef}
                  id="candidate-resume"
                  type="file"
                  accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleResumeChange}
                  className="hidden"
                />
              </Field>
            )}
          </form.Field>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={onSuccess}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={isPending}>
            {isPending && <Spinner />}
            Save Changes
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default CandidateEditForm;

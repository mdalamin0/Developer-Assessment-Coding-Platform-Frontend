"use client";

import { useForm } from "@tanstack/react-form";
import { FetchError } from "ofetch";
import { useRef } from "react";
import { Upload } from "lucide-react";
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
import { recruiterFormSchema } from "../profile.validation";
import { RecruiterEditFormProps } from "../profile.types";
import { useUpdateRecruiterProfile } from "../hooks/profile.hooks";



const RecruiterEditForm = ({
  name,
  email,
  companyName,
  companyWebsite,
  companyDescription,
  designation,
  companyLogo,
  onSuccess,
}: RecruiterEditFormProps) => {
  const logoInputRef = useRef<HTMLInputElement>(null);

  const { mutate: updateRecruiterProfile, isPending } =
    useUpdateRecruiterProfile();

  const form = useForm({
    defaultValues: {
      name: name || "",
      companyName: companyName || "",
      companyWebsite: companyWebsite || "",
      companyDescription: companyDescription || "",
      designation: designation || "",
      companyLogo: null as File | null,
    },

    validators: {
      onSubmit: recruiterFormSchema,
    },

    onSubmit: ({ value }) => {
      const formData = new FormData();

      formData.append(
        "data",
        JSON.stringify({
          name: value.name.trim(),
          companyName: value.companyName.trim(),
          companyWebsite: value.companyWebsite.trim(),
          companyDescription: value.companyDescription.trim(),
          designation: value.designation.trim(),
        }),
      );

      if (value.companyLogo) {
        formData.append("companyLogo", value.companyLogo);
      }

      updateRecruiterProfile(formData, {
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

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Company logo must be smaller than 5MB.");
      event.target.value = "";
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    form.setFieldValue("companyLogo", file);
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
              Update your account information.
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
              <FieldLabel htmlFor="recruiter-email">Email</FieldLabel>

              <Input id="recruiter-email" value={email} disabled readOnly />
            </Field>
          </div>
        </div>

        {/* Company Information */}
        <div className="form-section">
          <div className="form-section-header">
            <h3 className="font-semibold">Company Information</h3>

            <p className="text-sm text-muted-foreground">
              Update your organization and professional information.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <form.Field name="companyName">
              {(field) => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel htmlFor={field.name}>Company Name</FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="Enter your company name"
                      aria-invalid={invalid}
                    />

                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="designation">
              {(field) => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel htmlFor={field.name}>Designation</FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="e.g. Talent Acquisition Specialist"
                      aria-invalid={invalid}
                    />

                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          <form.Field name="companyWebsite">
            {(field) => {
              const invalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={invalid}>
                  <FieldLabel htmlFor={field.name}>Company Website</FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="url"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="https://example.com"
                    aria-invalid={invalid}
                  />

                  {invalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="companyDescription">
            {(field) => {
              const invalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Company Description
                  </FieldLabel>

                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Tell us about your company..."
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

        {/* Company Logo */}
        <div className="form-section">
          <div className="form-section-header">
            <h3 className="font-semibold">Company Logo</h3>

            <p className="text-sm text-muted-foreground">
              Upload your company logo. Maximum 5MB.
            </p>
          </div>

          <form.Field name="companyLogo">
            {(field) => (
              <Field>
                <FieldLabel>Company Logo</FieldLabel>

                <button
                  type="button"
                  onClick={() => logoInputRef.current?.click()}
                  className="group flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 px-6 py-8 text-center transition-colors hover:border-primary/50 hover:bg-primary/5"
                >
                  <div className="mb-3 flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                    <Upload className="size-5" />
                  </div>

                  <p className="text-sm font-medium">
                    {field.state.value
                      ? field.state.value.name
                      : "Click to upload company logo"}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    PNG, JPG or WebP · Maximum 5MB
                  </p>

                  {field.state.value && (
                    <p className="mt-3 text-xs font-medium text-primary">
                      New logo selected
                    </p>
                  )}

                  {!field.state.value && companyLogo && (
                    <p className="mt-3 text-xs text-muted-foreground">
                      Current company logo is already uploaded.
                    </p>
                  )}
                </button>

                <Input
                  ref={logoInputRef}
                  id="company-logo"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleLogoChange}
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

export default RecruiterEditForm;

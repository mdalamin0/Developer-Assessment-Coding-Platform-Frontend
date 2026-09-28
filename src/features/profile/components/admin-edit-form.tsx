"use client";

import { useForm } from "@tanstack/react-form";
import { FetchError } from "ofetch";
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

import { useUpdateAdminProfile } from "../hooks/profile.hooks";
import { AdminEditFormProps } from "../profile.types";
import { adminFormSchema } from "../profile.validation";



const AdminEditForm = ({
  name,
  email,
  onSuccess,
}: AdminEditFormProps) => {
  const { mutate: updateAdminProfile, isPending } =
    useUpdateAdminProfile();

  const form = useForm({
    defaultValues: {
      name: name || "",
    },

    validators: {
      onSubmit: adminFormSchema,
    },

    onSubmit: ({ value }) => {
      updateAdminProfile(
        {
          name: value.name.trim(),
        },
        {
          onSuccess: (res) => {
            if (!res.success) {
              toast.error(
                res.message || "Failed to update profile.",
              );
              return;
            }

            toast.success(
              res.message || "Profile updated successfully.",
            );

            onSuccess();
          },

          onError: (error: FetchError) => {
            const errorMessage =
              error?.data?.message ||
              error?.message ||
              "Failed to update profile.";

            toast.error(errorMessage);
          },
        },
      );
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <div className="form-section">
          <div className="form-section-header">
            <h3 className="font-semibold">Basic Information</h3>

            <p className="text-sm text-muted-foreground">
              Update your administrator account information.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <form.Field name="name">
              {(field) => {
                const invalid =
                  field.state.meta.isTouched &&
                  !field.state.meta.isValid;

                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Full Name
                    </FieldLabel>

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

                    {invalid && (
                      <FieldError
                        errors={field.state.meta.errors}
                      />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <Field>
              <FieldLabel htmlFor="admin-email">
                Email
              </FieldLabel>

              <Input
                id="admin-email"
                value={email}
                disabled
                readOnly
              />
            </Field>
          </div>
        </div>

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

export default AdminEditForm;
;

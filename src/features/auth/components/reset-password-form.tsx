/** biome-ignore-all lint/a11y/noSvgWithoutTitle: <explanation> */
"use client";

import { useForm } from "@tanstack/react-form";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FetchError } from "ofetch";
import { toast } from "sonner";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

import { resetPasswordSchema } from "../auth.schema";
import { useResetPassword } from "../hooks";

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [showPassword, setShowPassword] = useState(false);

  const {
    mutate: resetPassword,
    isPending: resetPasswordPending,
  } = useResetPassword();

  const form = useForm({
    defaultValues: {
      otp: "",
      newPassword: "",
    },

    validators: {
      onSubmit: resetPasswordSchema,
    },

    onSubmit: ({ value }) => {
      resetPassword(
        {
          email,
          newPassword: value.newPassword,
          otp: value.otp,
        },
        {
          onSuccess: (res) => {
            if (!res.success) {
              toast.error(
                res.message || "Unable to reset your password.",
              );
              return;
            }

            toast.success(
              res.message || "Password reset successfully.",
            );

            router.push("/login");
          },

          onError: (error: FetchError) => {
            console.log(error);

            const errorMessage =
              error?.data?.message ||
              error?.message ||
              "Unable to reset your password. Please try again.";

            toast.error(errorMessage);
          },
        },
      );
    },
  });

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-10 sm:px-6">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-xl shadow-primary/5 backdrop-blur-sm sm:p-8">
          {/* Heading */}
          <div className="text-center">
            <div className="mb-5 inline-flex size-20 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-8 ring-primary/5">
              <KeyRound className="size-9" />
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Reset your password
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              We sent a verification code to
            </p>

            <p className="mt-1 break-all text-sm font-medium text-foreground">
              {email}
            </p>
          </div>

          {/* Form */}
          <form
            className="mt-8"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup className="gap-5">
              {/* OTP */}
              <form.Field name="otp">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Verification code
                      </FieldLabel>

                      <div className="relative">
                        <CheckCircle2 className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors" />

                        <Input
                          id={field.name}
                          name={field.name}
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          placeholder="Enter 6-digit OTP"
                          value={field.state.value}
                          onChange={(e) =>
                            field.handleChange(
                              e.target.value.replace(/\D/g, ""),
                            )
                          }
                          onBlur={field.handleBlur}
                          aria-invalid={isInvalid}
                          className="h-11 rounded-xl pl-10.5 text-center text-base tracking-[0.35em]"
                        />
                      </div>

                      <div className="min-h-5">
                        {isInvalid ? (
                          <FieldError
                            errors={field.state.meta.errors}
                          />
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            Enter the 6-digit code from your email.
                          </span>
                        )}
                      </div>
                    </Field>
                  );
                }}
              </form.Field>

              {/* New Password */}
              <form.Field name="newPassword">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        New password
                      </FieldLabel>

                      <div className="group relative">
                        <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />

                        <Input
                          id={field.name}
                          name={field.name}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your new password"
                          autoComplete="new-password"
                          value={field.state.value}
                          onChange={(e) =>
                            field.handleChange(e.target.value)
                          }
                          onBlur={field.handleBlur}
                          aria-invalid={isInvalid}
                          className="h-11 rounded-xl pl-10.5 pr-11"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword((current) => !current)
                          }
                          aria-label={
                            showPassword
                              ? "Hide password"
                              : "Show password"
                          }
                          className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {showPassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>

                      <div className="min-h-5">
                        {isInvalid ? (
                          <FieldError
                            errors={field.state.meta.errors}
                          />
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            Use a strong password for your account.
                          </span>
                        )}
                      </div>
                    </Field>
                  );
                }}
              </form.Field>

              {/* Submit */}
              <Field className="pt-1">
                <Button
                  type="submit"
                  size="lg"
                  disabled={resetPasswordPending}
                  className="h-11 w-full rounded-xl shadow-lg shadow-primary/15 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  {resetPasswordPending ? (
                    <>
                      <Spinner />
                      Resetting password...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </Field>
            </FieldGroup>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Button
              nativeButton={false}
              render={<Link href="/login" />}
              variant="ghost"
              className="rounded-xl text-sm text-muted-foreground hover:text-foreground"
            >
              Back to login
            </Button>
          </div>
        </div>

        <p className="mt-5 text-center text-xs leading-5 text-muted-foreground">
          The verification code will expire after a limited time.
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
/** biome-ignore-all lint/a11y/noSvgWithoutTitle: <explanation> */
"use client";

import { useForm } from "@tanstack/react-form";
import { KeyRound, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FetchError } from "ofetch";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

import { useForgotPassword } from "../hooks";
import { forgotPasswordSchema } from "../auth.schema";

const ForgotPasswordForm = () => {
  const router = useRouter();

  const { mutate: forgotPassword, isPending: forgotPasswordPending } =
    useForgotPassword();

  const form = useForm({
    defaultValues: {
      email: "",
    },

    validators: {
      onSubmit: forgotPasswordSchema,
    },

    onSubmit: ({ value }) => {
      forgotPassword(value.email, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.error(res.message || "Unable to process your request.");
            return;
          }

          toast.success(
            res.message || "Password reset instructions sent successfully.",
          );

          router.push(
            `/reset-password?email=${encodeURIComponent(value.email)}`,
          );
        },

        onError: (error: FetchError) => {
          console.log(error);

          const errorMessage =
            error?.data?.message ||
            error?.message ||
            "Unable to send reset instructions.";

          toast.error(errorMessage);
        },
      });
    },
  });

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-10 sm:px-6 ">
      <div className="w-full max-w-md border border-gray-300 p-4 shadow rounded-2xl">
        {/* Heading */}
        <div className="mb-7 text-center">
          <div className="mb-3 inline-flex size-20 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <KeyRound className="size-10" />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Forgot your password?
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Enter your email address and we&apos;ll help you reset your
            password.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="gap-5">
            {/* Email */}
            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email address</FieldLabel>

                    <div className="group relative">
                      <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />

                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        aria-invalid={isInvalid}
                        className="h-11 pl-10.5"
                      />
                    </div>

                    <div className="min-h-5">
                      {isInvalid ? (
                        <FieldError errors={field.state.meta.errors} />
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          Enter the email associated with your account.
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
                disabled={forgotPasswordPending}
                className="h-11 w-full shadow-lg shadow-primary/15 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
              >
                {forgotPasswordPending ? (
                  <>
                    <Spinner />
                    Sending...
                  </>
                ) : (
                  "Send OTP"
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
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Back to login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;

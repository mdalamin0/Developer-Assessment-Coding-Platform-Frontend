/** biome-ignore-all lint/a11y/noSvgWithoutTitle: <explanation> */
"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
  UsersRound,
} from "lucide-react";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginRole } from "../auth.types";
import { registerSchema } from "../auth.schema";
import { useRegister } from "../hooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FetchError } from "ofetch";
import { Spinner } from "@/components/ui/spinner";

const RgisterForm = () => {
  const [role, setRole] = useState<LoginRole>("CANDIDATE");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { mutate: register, isPending: registerPending } = useRegister();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },

    validators: {
      onSubmit: registerSchema,
    },

    onSubmit: ({ value }) => {
      const registerData = {
        name: value.name,
        email: value.email,
        password: value.password,
        role,
      };
      console.log(registerData);
      register(registerData, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.error(
              res.message || "Authentication failed. Please try again.",
            );
          }
          toast.success(res.message || "Verify OTP send to your email.");
          const params = new URLSearchParams({email: registerData.email})
          router.push(`/register/verify-account?${params.toString()}`);
        },
        onError: (error: FetchError) => {
          console.log(error);
          const errorMessage =
            error?.data?.message || error?.message || "Authentication failure";
          toast.error(errorMessage);
        },
      });
    },
  });

  const isCandidate = role === "CANDIDATE";

  return (
    <div className="w-full max-w-md">
      {/* Heading */}
      <div className="mb-7 text-center">
        <div className="mb-3 inline-flex size-20 items-center justify-center rounded-xl bg-primary/10 text-primary ">
          <UserRound className="size-10" />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Create your account
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Sign up to continue to your assessment workspace.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup className="gap-5">
          {/* Role */}
          <Field>
            <div className="space-y-2">
              <FieldLabel>Continue as</FieldLabel>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {/* Candidate */}
                <button
                  type="button"
                  onClick={() => setRole("CANDIDATE")}
                  className={`flex h-14 min-w-0 items-center gap-2 rounded-lg border px-2 text-left transition-all sm:h-16 sm:gap-3 sm:rounded-xl sm:px-4 ${
                    role === "CANDIDATE"
                      ? "border-primary bg-primary/5 shadow-sm shadow-primary/10"
                      : "border-border bg-background hover:border-primary/30 hover:bg-primary/[0.02]"
                  }`}
                >
                  <span
                    className={`flex size-7 shrink-0 items-center justify-center rounded-md sm:size-9 sm:rounded-lg ${
                      role === "CANDIDATE"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <UserRound className="size-3.5 sm:size-4" />
                  </span>

                  <span className="min-w-0">
                    <span className="block truncate text-xs font-semibold sm:text-sm">
                      Candidate
                    </span>

                    <span className="block truncate text-[9px] text-muted-foreground sm:text-[11px]">
                      Take assessments
                    </span>
                  </span>
                </button>

                {/* Recruiter */}
                <button
                  type="button"
                  onClick={() => setRole("RECRUITER")}
                  className={`flex h-14 min-w-0 items-center gap-2 rounded-lg border px-2.5 text-left transition-all sm:h-16 sm:gap-3 sm:rounded-xl sm:px-4 ${
                    role === "RECRUITER"
                      ? "border-primary bg-primary/5 shadow-sm shadow-primary/10"
                      : "border-border bg-background hover:border-primary/30 hover:bg-primary/[0.02]"
                  }`}
                >
                  <span
                    className={`flex size-7 shrink-0 items-center justify-center rounded-md sm:size-9 sm:rounded-lg ${
                      role === "RECRUITER"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <UsersRound className="size-3.5 sm:size-4" />
                  </span>

                  <span className="min-w-0">
                    <span className="block truncate text-xs font-semibold sm:text-sm">
                      Recruiter
                    </span>

                    <span className="block truncate text-[9px] text-muted-foreground sm:text-[11px]">
                      Manage assessments
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </Field>

          {/* Name */}
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>

                  <div className="group relative">
                    <UserRound className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />

                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="Enter your name"
                      autoComplete="off"
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
                      <span className=" text-sm text-muted-foreground">
                        Enter your full name.
                      </span>
                    )}
                  </div>
                </Field>
              );
            }}
          </form.Field>

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
                      <span className=" text-sm text-muted-foreground">
                        Enter your valid email address.
                      </span>
                    )}
                  </div>
                </Field>
              );
            }}
          </form.Field>

          {/* Password */}
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <div className="flex items-center justify-between gap-3">
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                    <a
                      href="/forgot-password"
                      className="text-xs font-medium text-primary underline-offset-4 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <div className="group relative">
                    <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />

                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      className="h-11 pl-10.5 pr-11"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
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
                      <FieldError errors={field.state.meta.errors} />
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Must contain at least 8 characters.
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
              disabled={registerPending}
              className="h-11 w-full shadow-lg shadow-primary/15 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            >
              {registerPending ? <> <Spinner/> Signing...</> : "Sign Up"} 
            </Button>
          </Field>

          {/* Google — Candidate only */}
          {isCandidate && (
            <>
              <FieldSeparator>Or continue with</FieldSeparator>

              <Field>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="h-11 w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="size-4"
                  >
                    <path
                      fill="#4285F4"
                      d="M21.35 12.23c0-.78-.07-1.53-.22-2.25H12v4.26h5.23a4.47 4.47 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.92-4.18 2.92-7.4Z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.5Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M6.54 13.58A5.86 5.86 0 0 1 6.23 12c0-.55.1-1.08.31-1.58V7.89H3.3A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.06 1.05 4.11l3.24-2.53Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 6.39c1.43 0 2.72.49 3.73 1.46l2.8-2.8C16.84 3.43 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.39l3.24 2.53C7.31 8.11 9.46 6.39 12 6.39Z"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </Field>
            </>
          )}
        </FieldGroup>
      </form>

      {/* Register */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <a
          href="/login"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          Login
        </a>
      </p>
    </div>
  );
};

export default RgisterForm;

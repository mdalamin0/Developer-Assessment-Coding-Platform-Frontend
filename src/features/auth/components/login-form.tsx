/** biome-ignore-all lint/a11y/noSvgWithoutTitle: <explanation> */
"use client";

import { useEffect, useState } from "react";
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
import { loginSchema } from "../auth.schema";
import { useLogin } from "../hooks";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useRouter, useSearchParams } from "next/navigation";
import { FetchError } from "ofetch";
import GoogleLoginButton from "./google-login";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { mutate: login, isPending: loginPending } = useLogin();
  const searchParams = useSearchParams();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    validators: {
      onSubmit: loginSchema,
    },

    onSubmit: ({ value }) => {
      const loginData = {
        email: value.email,
        password: value.password,
      };
      login(loginData, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.error(
              res.message || "Authentication failed. Please try again.",
            );
            return;
          }
          toast.success(res.message || "Logged in successfully!");
          router.push("/");
        },
        onError: (error: FetchError) => {
          console.log(error);
          const errorMessage =
            error?.data?.message || error?.message || "Authorization failure";
          toast.error(errorMessage);
        },
      });
    },
  });

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "google-login-failed") {
     toast.error("Google login is only available for Candidates.", {
       description: "Please login with email and password.",
       id: "google-login-error",
     });
      window.history.replaceState(null, "", "/login");
    }
  }, [searchParams]);

  return (
    <div className="w-full max-w-md">
      {/* Heading */}
      <div className="mb-7 text-center">
        <div className="mb-3 inline-flex size-20 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <UserRound className="size-10" />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Welcome back
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Sign in to continue to your assessment workspace.
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
              disabled={loginPending}
              className="h-11 w-full shadow-lg shadow-primary/15 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            >
              {loginPending ? (
                <>
                  {" "}
                  <Spinner /> Signing...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </Field>

          {/* Google — Candidate only */}

          <FieldSeparator>Or continue with</FieldSeparator>

          <Field>
            <GoogleLoginButton />
          </Field>
        </FieldGroup>
      </form>

      {/* Register */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <a
          href="/register"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          Create account
        </a>
      </p>
    </div>
  );
};

export default LoginForm;

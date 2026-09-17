"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ArrowLeft, MailCheck } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useVerifyEmail } from "../hooks";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { FetchError } from "ofetch";

const VerifyEmailForm = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const [isInvalid, setIsInvalid] = useState(false);
  const {mutate: verify, isPending: verifyPending} = useVerifyEmail();

  useEffect(() => {
    if (!email) {
      router.push("/");
    }
    return;
  }, [email, router]);

  const handleOTP = () => {
    if (otp.length !== 6) {
      setIsInvalid(true);
      return;
    }

    const verifyData = {
      email,
      otp,
    };

    verify(verifyData, {
      onSuccess: (res) => {
        console.log(res);
        if (!res.success) {
          toast.error("Verify Failed. Please try again.");
        }

        toast.success("Successfully Verify Your Account.");
        router.push("/");
      },
      onError: (error: FetchError) => {
        const errorMessage =
          error?.data?.message ||
          error?.message ||
          "Verify failure, Please try again.";
        toast.error(errorMessage);
      },
    });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <MailCheck className="size-6" />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Verify your email
        </h1>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          We&apos;ve sent a 6-digit verification code to
        </p>

        <p className="mt-1 text-sm font-semibold text-foreground">{email}</p>
      </div>

      {/* OTP */}
      <div className="mt-8 flex justify-center">
        <FieldGroup>
          <form
            id="otp-form"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleOTP();
            }}
          >
            <Field className="items-center" data-invalid={isInvalid}>
              <FieldLabel htmlFor="verification-code" className="sr-only">
                Verification code
              </FieldLabel>

              <InputOTP
                onChange={(value) => {
                  setOtp(value);
                  if (isInvalid) {
                    setIsInvalid(false);
                  }
                }}
                value={otp}
                autoComplete="off"
                id="verification-code"
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                autoFocus
              >
                <InputOTPGroup className="gap-2 sm:gap-3">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="size-11 rounded-xl border bg-background text-lg font-semibold shadow-sm transition-all duration-200 first:rounded-xl last:rounded-xl sm:size-12"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              <div className="min-h-4">
                {isInvalid ? (
                  <FieldError errors={[{ message: "Invalid OTP" }]} />
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Enter Valid OTP
                  </span>
                )}
              </div>
            </Field>
          </form>
        </FieldGroup>
      </div>

      {/* Verify Button */}
      <Button
        form="otp-form"
        type="submit"
        size="lg"
        disabled={verifyPending}
        className="mt-7 h-11 w-full shadow-lg shadow-primary/15 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
      >
        {verifyPending ? <> <Spinner/> Verifying... </> : "Verify email"}
      </Button>

      {/* Resend */}
      <div className="mt-6 text-center text-sm text-muted-foreground">
        Didn&apos;t receive the code?{" "}
        <button
          type="button"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          Resend code
        </button>
      </div>

      {/* Back */}
      <div className="mt-6 border-t pt-5 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to sign in
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmailForm;

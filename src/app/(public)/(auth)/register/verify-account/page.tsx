import Logo from "@/assets/logo/Logo";
import BackgroundDecoration from "@/components/shared/background-decoration";
import VerifyEmailForm from "@/features/auth/components/verify-email-form";
import { Suspense } from "react";
import { redirect } from "next/navigation";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;
  

  if (!email) {
    redirect("/");
  }

  

  return (
    <main className="relative min-h-svh overflow-hidden bg-background">
      <BackgroundDecoration />

      <div className="container-app relative flex min-h-svh flex-col">
        {/* Header */}
        <header className="shrink-0 pt-4 sm:pt-5">
          <Logo />
        </header>

        {/* Verification */}
        <div className="flex flex-1 items-center justify-center py-8 ">
          <div className="w-full max-w-md">
            <div className="rounded-2xl border bg-card p-6 shadow-xl shadow-primary/5 sm:p-8 lg:p-10">
              <Suspense fallback={<>Loading...</>}>
                <VerifyEmailForm />
              </Suspense>
            </div>
          </div>
        </div>
        

        {/* Footer */}
        <footer className="shrink-0 pb-4 sm:pb-5">
          <div className="flex items-center justify-center gap-3 text-[11px] text-muted-foreground">
            <span className="h-px w-8 bg-border sm:w-12" />
            <span>Secure verification</span>
            <span className="h-px w-8 bg-border sm:w-12" />
          </div>
        </footer>
      </div>
    </main>
  );
}

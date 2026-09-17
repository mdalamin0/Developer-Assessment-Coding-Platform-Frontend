import Image from "next/image";
import Logo from "@/assets/logo/Logo";
import RgisterForm from "@/features/auth/components/register.form";
import BackgroundDecoration from "@/components/shared/background-decoration";

export default function RegisterPage() {
  return (
    <main className="relative min-h-svh overflow-hidden bg-background">
      <BackgroundDecoration/>

      <div className="container-app relative flex min-h-svh flex-col">
        {/* Header */}
        <header className="shrink-0 pt-4 sm:pt-5">
          <Logo />
        </header>

        {/* Main authentication area */}
        <div className="flex flex-1 items-center justify-center py-5 sm:py-6 lg:py-7">
          <div className="w-full max-w-5xl">
            <div className="overflow-hidden rounded-2xl border bg-card shadow-xl shadow-primary/5">
              <div className="grid md:min-h-[570px] md:grid-cols-2">
                {/* LEFT SIDE — IMAGE */}
                <div className="relative hidden min-h-[570px] overflow-hidden bg-primary/[0.035] md:block">
                  {/* Soft center glow */}
                  <div className="absolute left-1/2 top-[40%] size-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl lg:size-[360px]" />

                  {/* Decorative circles */}
                  <div className="absolute -left-28 -top-28 size-64 rounded-full border border-primary/10" />

                  <div className="absolute -bottom-32 -right-32 size-80 rounded-full border border-primary/10" />

                  {/* Illustration */}
                  <div className="absolute inset-x-0 top-0  flex justify-center px- pt- sm:px- sm:pt- lg:px- lg:pt-">
                    <div className=" relative aspect-square w-full max-w-[600px] h-full">
                      <Image
                        src="/register.png"
                        alt="Login Image"
                        fill
                        priority
                        quality={100}
                        sizes=" (min-width: 1024px) 390px, (min-width: 768px) 350px, 100vw"
                        className="object-fill"
                      />
                    </div>
                  </div>

                  {/* Platform highlights */}
                  <div className="absolute inset-x-0 top-[60%] px-8 lg:px-10">
                    <div className="mx-auto max-w-md">
                      <div className="mb-4 h-px bg-border/60" />

                      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <span className="size-2 rounded-full bg-chart-3" />
                          Timed assessments
                        </span>

                        <span className="flex items-center gap-1.5">
                          <span className="size-2 rounded-full bg-primary" />
                          Skill evaluation
                        </span>

                        <span className="flex items-center gap-1.5">
                          <span className="size-2 rounded-full bg-chart-2" />
                          Secure submissions
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom brand content */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-card/95 via-card/70 to-transparent px-8 pb-8 pt-20 lg:px-10 lg:pb-9">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
                      Developer Assessment Platform
                    </p>

                    <h2 className="mt-2.5 max-w-sm text-2xl font-semibold leading-tight tracking-tight lg:text-[28px]">
                      Assess skills.
                      <br />
                      Evaluate talent.
                      <br />
                      Build better teams.
                    </h2>

                    <p className="mt-2.5 max-w-md text-sm leading-5 text-muted-foreground">
                      Create smarter assessments, evaluate developer skills, and
                      discover the right talent with confidence.
                    </p>
                  </div>
                </div>

                {/* RIGHT SIDE — LOGIN FORM */}
                <div className="flex min-h-[1050px] items-center p-6 pt-10 sm:p-8 lg:p-10">
                  <RgisterForm />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="shrink-0 pb-4 sm:pb-5">
          <div className="flex items-center justify-center gap-3 text-[11px] text-muted-foreground">
            <span className="h-px w-8 bg-border sm:w-12" />
            <span>Secure authentication</span>
            <span className="h-px w-8 bg-border sm:w-12" />
          </div>
        </footer>
      </div>
    </main>
  );
}

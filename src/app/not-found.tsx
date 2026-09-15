import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Background Illustration */}
      <div className="absolute inset-0">
        <Image
          src="/not-found.png"
          alt=""
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-top sm:object-center"
        />
      </div>

      {/* Soft overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30" />

      <div className="container-app relative flex min-h-screen flex-col">
        {/* Content */}
        <div
          className="
            flex flex-1 flex-col items-center justify-end
            pb-8
            pt-[56vh]
            text-center

            max-[399px]:pb-6
            max-[399px]:pt-[58vh]

            sm:pb-14
            sm:pt-[48vh]
          "
        >
          <p
            className="
              mb-2
              text-[10px]
              font-bold
              uppercase
              tracking-[0.28em]
              text-primary

              min-[400px]:mb-3
              min-[400px]:text-xs

              sm:text-sm
            "
          >
            Page Not Found
          </p>

          <h1
            className="
              max-w-[290px]
              text-[26px]
              font-semibold
              leading-[1.15]
              tracking-tight
              text-foreground

              min-[400px]:max-w-2xl
              min-[400px]:text-3xl

              sm:text-4xl
              lg:text-[42px]
            "
          >
            Oops! The page you&apos;re looking for doesn&apos;t exist.
          </h1>

          <p
            className="
              mx-auto
              mt-3
              max-w-[285px]
              text-[13px]
              leading-5
              text-muted-foreground

              min-[400px]:mt-4
              min-[400px]:max-w-lg
              min-[400px]:text-sm
              min-[400px]:leading-6

              sm:text-base
            "
          >
            The page you&apos;re looking for might have been moved, deleted, or
            never existed. Let&apos;s get you back to your assessment workspace.
          </p>

          {/* Actions */}
          <div
            className="
              mt-5
              flex
              w-full
              max-w-[285px]
              flex-col
              items-center
              justify-center
              gap-2.5

              min-[400px]:mt-8
              min-[400px]:max-w-none
              min-[400px]:flex-row
              min-[400px]:gap-3
            "
          >
            <Button
              render={<Link href="/" />}
              nativeButton={false}
              size="lg"
              className="
                h-11
                w-full
                min-[400px]:w-auto
                min-w-40
                shadow-lg
                shadow-primary/20
              "
            >
              <Home className="mr-2 size-4" />
              Back to Home
            </Button>

            <Button
              render={<Link href="/dashboard" />}
              nativeButton={false}
              variant="outline"
              size="lg"
              className="
                h-11
                w-full
                min-[400px]:w-auto
                min-w-40
                bg-background/80
                backdrop-blur-sm
              "
            >
              <ArrowLeft className="mr-2 size-4" />
              Go to Dashboard
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center pb-5 min-[400px]:pb-7">
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground min-[400px]:gap-3 min-[400px]:text-xs">
            <span className="h-px w-6 bg-border min-[400px]:w-10 sm:w-14" />

            <span className="whitespace-nowrap">
              Developer Assessment Platform
            </span>

            <span className="h-px w-6 bg-border min-[400px]:w-10 sm:w-14" />
          </div>
        </div>
      </div>
    </main>
  );
}

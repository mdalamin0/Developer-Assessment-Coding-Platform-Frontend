"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import Logo from "@/assets/logo/Logo";
import ThemeToggle from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "cn";
import { useGetMe, useLogout } from "@/features/auth/hooks";
import { UserRole } from "@/features/auth/auth.types";

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Assessments",
    href: "/assessments",
  },
  {
    label: "About",
    href: "/about",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data, isLoading } = useGetMe();
  const { mutate: logout } = useLogout();
  const queryClient = useQueryClient();


  const user = data?.data;
  const role = user?.role as UserRole | undefined;

  const dashboardRoute =
    role === "CANDIDATE"
      ? "/candidate"
      : role === "RECRUITER"
        ? "/recruiter"
        : role === "ADMIN"
          ? "/admin"
          : "/";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Logged out successfully");
        queryClient.removeQueries({ queryKey: ["user"] });
      },
      onError: () => {
        toast.error("Log Out Failed", {
          id: "logout",
          description: "Something went wrong, Please try again.",
        });
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container-app">
        <div className="flex h-16 items-center justify-between gap-4 sm:h-[68px]">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            {role && (
              <Link
                href={dashboardRoute}
                className={cn(
                  "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />

            <div className="ml-1 h-5 w-px bg-border" />

            {isLoading ? (
              <>
                <Button
                  variant="outline"
                  size="lg"
                  className="font-medium"
                  disabled
                >
                  Sign in
                </Button>

                <Button size="lg" disabled>
                  Get started
                </Button>
              </>
            ) : user ? (
              <Button size="lg" variant={"destructive"} onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="lg"
                  nativeButton={false}
                  render={<Link href="/login" />}
                  className="font-medium"
                >
                  Sign in
                </Button>

                <Button
                  nativeButton={false}
                  render={<Link href="/register" />}
                  size="lg"
                >
                  Get started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-9 rounded-full"
                    aria-label="Open navigation menu"
                  />
                }
              >
                <Menu className="size-5" />
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[300px] border-l bg-background/95 backdrop-blur-xl sm:w-[340px]"
              >
                <SheetHeader className="border-b pb-5">
                  <SheetTitle className="-ml-4">
                    <Logo />
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-2 px-3 pt-4">
                  {navLinks.map((link) => {
                    const isActive =
                      pathname === link.href ||
                      pathname.startsWith(`${link.href}/`);

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                          isActive
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                        )}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                  {role && (
                    <Link
                      href={dashboardRoute}
                      className={cn(
                        "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      Dashboard
                    </Link>
                  )}
                </div>

                <div className="mt-6 border-t px-3 pt-6">
                  {isLoading ? (
                    <div className="grid gap-2">
                      <Button variant="outline" size="lg" disabled>
                        Sign in
                      </Button>

                      <Button size="lg" disabled>
                        Get started
                      </Button>
                    </div>
                  ) : user ? (
                    <div className="grid gap-2">
                      <Button
                        variant="destructive"
                        size="lg"
                        onClick={() => {
                          setMobileOpen(false);
                          handleLogout();
                        }}
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="grid gap-2">
                      <Button
                        variant="outline"
                        nativeButton={false}
                        render={<Link href="/login" />}
                        size="lg"
                        onClick={() => setMobileOpen(false)}
                      >
                        Sign in
                      </Button>

                      <Button
                        nativeButton={false}
                        size="lg"
                        render={<Link href="/register" />}
                        onClick={() => setMobileOpen(false)}
                      >
                        Get started
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

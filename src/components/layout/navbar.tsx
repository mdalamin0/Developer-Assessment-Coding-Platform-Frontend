"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

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
import { usePathname } from "next/navigation";
import { cn } from "cn";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 764) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  
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
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />

            <div className="ml-1 h-5 w-px bg-border" />

            <Button
              variant="outline"
              size={"lg"}
              nativeButton={false}
              render={<Link href="/login" />}
              className=" font-medium"
            >
              Sign in
            </Button>

            <Button
              nativeButton={false}
              render={<Link href="/register" />}
              className=""
              size={"lg"}
            >
              Get started
            </Button>
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
                className="w-[300px] border-l bg-background/95 backdrop-blur-xl sm:w-[340px] "
              >
                <SheetHeader className="border-b pb-5">
                  <SheetTitle className="-ml-4">
                    <Logo />
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-2 pt-4 px-3">
                  {navLinks.map((link) => {
                    const isActive =
                      pathname === link.href ||
                      pathname.startsWith(`${link.href}/`);

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
                </div>

                <div className="mt-6 border-t pt-6 px-3">
                  <div className="grid gap-2">
                    <Button
                      variant="outline"
                      nativeButton={false}
                      render={<Link href="/login" />}
                      className=""
                      size={"lg"}
                    >
                      Sign in
                    </Button>

                    <Button
                      nativeButton={false}
                      size={"lg"}
                      render={<Link href="/register" />}
                      className=""
                    >
                      Get started
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

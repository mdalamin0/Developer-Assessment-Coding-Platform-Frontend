"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/assets/logo/Logo";
import { cn } from "cn";
import { Menu, ShieldCheck, X } from "lucide-react";
import { dashboardNavigation } from "@/routes/navigation";
import { UserRoleType } from "@/features/auth/auth.types";

interface DashboardSidebarProps {
  role: UserRoleType;
  open?: boolean;
  onClose?: () => void;
}

export default function DashboardSidebar({
  role,
  open = false,
  onClose,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const navigation = dashboardNavigation[role];

  return (
    <>
      {/* Mobile Overlay */}
      <button
        type="button"
        aria-label="Close navigation"
        className={cn(
          "fixed inset-0 z-40 cursor-default border-0 bg-black/40 p-0 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 sm:w-76 shrink-0 border-r bg-card shadow-xl transition-transform duration-300 lg:sticky lg:top-0 lg:z-30 lg:block lg:h-screen lg:translate-x-0 lg:shadow-none",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex gap-1 h-16 items-center justify-between border-b ">
            <Logo />

            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:hidden"
              aria-label="Close navigation"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
            {navigation.map((item) => {
              const Icon = item.icon;

              const isActive =
                pathname === item.href ||
                (item.href !== `/${role.toLowerCase()}` &&
                  pathname.startsWith(`${item.href}/`));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
                    "transition-all duration-200",
                    isActive
                      ? "bg-primary/10 text-primary shadow-sm"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <Icon
                    className={cn(
                      "size-[18px] shrink-0 transition-colors",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-accent-foreground",
                    )}
                    strokeWidth={1.8}
                  />

                  <span>{item.label}</span>

                  {isActive && (
                    <span className="ml-auto size-1.5 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom */}
          <div className="border-t p-3">
            <div className="rounded-lg bg-primary/5 px-3 py-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-primary" />

                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-foreground">
                    DevAssess
                  </p>

                  <p className="truncate text-[11px] text-muted-foreground">
                    Secure assessment workspace
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

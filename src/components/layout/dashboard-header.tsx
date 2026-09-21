"use client";

import Link from "next/link";
import { Bell, ChevronDown, LogOut, Menu, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/shared/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/features/auth/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DashboardHeaderProps {
  user?: {
    name?: string;
    email?: string;
    image?: string;
  };
  onMenuClick?: () => void;
}

export default function DashboardHeader({
  user,
  onMenuClick,
}: DashboardHeaderProps) {
  const router = useRouter();
   const { mutate: logout } = useLogout();
   const queryClient = useQueryClient();

  const name = user?.name || "User";
  const email = user?.email || "";
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

     const handleLogout = () => {
       logout(undefined, {
         onSuccess: () => {
             queryClient.setQueryData(["user"], null);

             toast.success("Logged out successfully");

             router.replace("/login");
             router.refresh();
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
    <header className="sticky top-0 z-30 h-16 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left */}
        <div className="flex min-w-0 items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="size-9 shrink-0 lg:hidden"
            onClick={onMenuClick}
            aria-label="Open navigation"
          >
            <Menu className="size-5" />
          </Button>

          <div className="hidden min-w-0 sm:block">
            <p className="truncate text- font-medium text-foreground">
              Welcome back, {name.split(" ")[0]} 👋
            </p>

            <p className="text-xs text-muted-foreground">
              Manage your assessment workspace
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            className="relative size-9 rounded-full"
            aria-label="Notifications"
          >
            <Bell className="size-[18px]" strokeWidth={1.8} />

            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary ring-2 ring-background" />
          </Button>

          <div className="mx-1 hidden h-5 w-px bg-border sm:block" />

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  className="h-10 gap-2  px-2 hover:bg-accent"
                />
              }
            >
              <Avatar className="size-8">
                <AvatarImage src={user?.image} alt={name} />

                <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                  {initials || <UserRound className="size-4" />}
                </AvatarFallback>
              </Avatar>

              <div className="hidden min-w-0 text-left sm:block">
                <p className="max-w-32 truncate text-sm font-medium">{name}</p>

                <p className="max-w-32 truncate text-[11px] text-muted-foreground">
                  {email}
                </p>
              </div>

              <ChevronDown className="hidden size-4 text-muted-foreground sm:block" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-2">
                <p className="truncate text-sm font-semibold">{name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {email}
                </p>
              </div>

              <DropdownMenuSeparator />

              <DropdownMenuItem render={<Link href="/profile" />}>
                <UserRound className="size-4" />
                Profile
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleLogout} className=" text-destructive focus:text-destructive">
                <LogOut className="size-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

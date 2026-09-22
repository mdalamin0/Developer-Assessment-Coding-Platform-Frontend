

"use client";

import type { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type ModalMode = "default" | "form" | "confirm";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  mode?: ModalMode;
  children: ReactNode;
  className?: string;
}

const modeStyles: Record<ModalMode, string> = {
  default: "sm:max-w-lg",
  form: "sm:max-w-2xl",
  confirm: "sm:max-w-md",
};

export default function Modal({
  open,
  onOpenChange,
  title,
  description,
  mode = "default",
  children,
  className,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "flex max-h-[90vh] w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden rounded-2xl p-0 sm:w-full",
          modeStyles[mode],
          className,
        )}
      >
        <DialogHeader className="shrink-0 border-b border-border/60 px-5 py-4 sm:px-6 sm:py-5">
          <DialogTitle className="text-base font-semibold sm:text-lg">
            {title}
          </DialogTitle>

          {description && (
            <DialogDescription className="text-sm leading-5">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}










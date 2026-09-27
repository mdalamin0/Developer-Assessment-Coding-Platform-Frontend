"use client";

import { useRef } from "react";
import { Camera, Pencil } from "lucide-react";
import { FetchError } from "ofetch";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { useUpdateProfileImage } from "../hooks/profile.hooks";
import { ProfileHeaderProps } from "../profile.types";

const ProfileHeader = ({
  name,
  email,
  image,
  role,
  onEdit,
}: ProfileHeaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: updateProfileImage, isPending: updateProfilePending } =
    useUpdateProfileImage();

  const initials =
    name
      ?.split(" ")
      .map((item) => item[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const roleLabel =
    role === "CANDIDATE"
      ? "Candidate"
      : role === "RECRUITER"
        ? "Recruiter"
        : "Administrator";

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Profile image must be smaller than 5MB.");
      event.target.value = "";
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    const formData = new FormData();

    formData.append("profileImage", file);

    updateProfileImage(formData, {
      onSuccess: (res) => {
        if (!res.success) {
          toast.error(res.message || "Failed to update profile image.");
          return;
        }

        toast.success(res.message || "Profile image updated successfully.");

        event.target.value = "";
      },

      onError: (error: FetchError) => {
        const errorMessage =
          error?.data?.message ||
          error?.message ||
          "Failed to update profile image.";

        toast.error(errorMessage);

        event.target.value = "";
      },
    });
  };

  return (
    <div className="app-card overflow-hidden">
      <div className="h-28 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent" />

      <div className="-mt-12 px-5 pb-6 sm:px-8 sm:pb-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
          <div className="relative shrink-0">
            <Avatar className="size-24 border-4 border-background shadow-lg">
              <AvatarImage src={image ?? undefined} alt={name} />

              <AvatarFallback className="text-2xl font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>

            <Button
              type="button"
              size="icon"
              variant="secondary"
              disabled={updateProfilePending}
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-1 right-1 size-9 rounded-full border-2 border-background shadow-md"
            >
              {updateProfilePending ? (
                <Spinner className="size-4" />
              ) : (
                <Camera className="size-4" />
              )}
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight">{name}</h1>

              <Badge variant="secondary">{roleLabel}</Badge>
            </div>

            <p className="mt-1 text-sm text-muted-foreground">{email}</p>
          </div>

          <Button
            type="button"
            variant="outline"
            className="gap-2"
            onClick={onEdit}
          >
            <Pencil className="size-4" />
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;

"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  BriefcaseBusiness,
  Building2,
  Globe,
  Phone,
} from "lucide-react";

import Modal from "@/components/shared/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    id: string;
    name: string;
    role: "CANDIDATE" | "RECRUITER" | "ADMIN";
    profile?: any;
  };
}

interface FormValues {
  name: string;

  contactNumber: string;
  bio: string;
  experience: string;
  githubUrl: string;
  linkedinUrl: string;

  companyName: string;
  companyWebsite: string;
  companyDescription: string;
  designation: string;
}

const EditProfileModal = ({
  open,
  onOpenChange,
  user,
}: EditProfileModalProps) => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  useEffect(() => {
    if (!user) return;

    reset({
      name: user.name ?? "",

      contactNumber:
        user.role === "CANDIDATE" ? (user.profile?.contactNumber ?? "") : "",

      bio: user.role === "CANDIDATE" ? (user.profile?.bio ?? "") : "",

      experience:
        user.role === "CANDIDATE" ? (user.profile?.experience ?? "") : "",

      githubUrl:
        user.role === "CANDIDATE" ? (user.profile?.githubUrl ?? "") : "",

      linkedinUrl:
        user.role === "CANDIDATE" ? (user.profile?.linkedinUrl ?? "") : "",

      companyName:
        user.role === "RECRUITER" ? (user.profile?.companyName ?? "") : "",

      companyWebsite:
        user.role === "RECRUITER" ? (user.profile?.companyWebsite ?? "") : "",

      companyDescription:
        user.role === "RECRUITER"
          ? (user.profile?.companyDescription ?? "")
          : "",

      designation:
        user.role === "RECRUITER" ? (user.profile?.designation ?? "") : "",
    });
  }, [user, reset]);

  const onSubmit = (values: FormValues) => {
    console.log(values);

    // API mutation এখানে connect হবে
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Profile"
      description="Update your personal and professional information."
      mode="form"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="form-section">
          <div className="form-section-header">
            <h3 className="font-semibold">Basic Information</h3>
            <p className="text-sm text-muted-foreground">
              Update your basic account information.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>

              <Input {...register("name")} placeholder="Enter your full name" />
            </div>
          </div>
        </div>

        {/* Candidate */}
        {user.role === "CANDIDATE" && (
          <div className="form-section">
            <div className="form-section-header">
              <h3 className="font-semibold">Candidate Information</h3>
              <p className="text-sm text-muted-foreground">
                Keep your professional profile up to date.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Phone className="size-4 text-muted-foreground" />
                  Contact Number
                </label>

                <Input
                  {...register("contactNumber")}
                  placeholder="+880 1XXXXXXXXX"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Experience</label>

                <Input {...register("experience")} placeholder="e.g. 2 years" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>

                <Textarea
                  {...register("bio")}
                  placeholder="Tell us about yourself..."
                  className="min-h-24 resize-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <Globe className="size-4 text-muted-foreground" />
                    GitHub URL
                  </label>

                  <Input
                    {...register("githubUrl")}
                    placeholder="https://github.com/..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <Linkedin className="size-4 text-muted-foreground" />
                    LinkedIn URL
                  </label>

                  <Input
                    {...register("linkedinUrl")}
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recruiter */}
        {user.role === "RECRUITER" && (
          <div className="form-section">
            <div className="form-section-header">
              <h3 className="font-semibold">Organization Information</h3>
              <p className="text-sm text-muted-foreground">
                Update your company and recruiter information.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Building2 className="size-4 text-muted-foreground" />
                  Company Name
                </label>

                <Input
                  {...register("companyName")}
                  placeholder="Enter company name"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Globe className="size-4 text-muted-foreground" />
                  Company Website
                </label>

                <Input
                  {...register("companyWebsite")}
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <BriefcaseBusiness className="size-4 text-muted-foreground" />
                  Designation
                </label>

                <Input
                  {...register("designation")}
                  placeholder="e.g. Lead Talent Acquisition Specialist"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Company Description
                </label>

                <Textarea
                  {...register("companyDescription")}
                  placeholder="Describe your company..."
                  className="min-h-24 resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Admin */}
        {user.role === "ADMIN" && (
          <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
            <p className="text-sm text-muted-foreground">
              Administrator profile information is managed by the system.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 border-t border-border/60 pt-5">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProfileModal;

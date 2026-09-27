import { CalendarDays, CheckCircle2, Mail, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ProfileAccountInfoProps } from "../profile.types";



const ProfileAccountInfo = ({
  email,
  status,
  provider,
  emailVerified,
  createdAt,
}: ProfileAccountInfoProps) => {
  return (
    <div className="app-card">
      <div className="app-card-header">
        <div>
          <h2 className="font-semibold">Account Information</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Your account and authentication details.
          </p>
        </div>
      </div>

      <div className="app-card-content space-y-5">
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
            <Mail className="size-4 text-muted-foreground" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-medium text-muted-foreground">
              Email Address
            </p>
            <p className="mt-1 break-all font-medium">{email}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
            <ShieldCheck className="size-4 text-muted-foreground" />
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Account Status
            </p>

            <Badge className="mt-1" variant="secondary">
              {status}
            </Badge>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
            <CheckCircle2 className="size-4 text-muted-foreground" />
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Email Verification
            </p>

            <p className="mt-1 font-medium">
              {emailVerified ? "Verified" : "Not verified"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
            <CalendarDays className="size-4 text-muted-foreground" />
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Member Since
            </p>

            <p className="mt-1 font-medium">
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
            <Mail className="size-4 text-muted-foreground" />
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Authentication
            </p>

            <p className="mt-1 font-medium">
              {provider === "GOOGLE" ? "Google" : "Email & Password"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAccountInfo;

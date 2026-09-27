import { BriefcaseBusiness, Building2, Globe, } from "lucide-react";
import { RecruiterProfileProps } from "../profile.types";



const RecruiterProfile = ({ profile }: RecruiterProfileProps) => {
  return (
    <div className="app-card overflow-hidden">
      <div className="app-card-header">
        <div>
          <h2 className="font-semibold">Recruiter Profile</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Your recruiter and organization information.
          </p>
        </div>
      </div>

      <div className="app-card-content">
        {/* Company Identity */}
        <div className="flex flex-col gap-5 rounded-2xl border border-border/60 bg-muted/20 p-5 sm:flex-row sm:items-center">
          <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-background">
            {profile.companyLogo ? (
              <img
                src={profile.companyLogo}
                alt={profile.companyName}
                className="size-full object-contain p-2"
              />
            ) : (
              <Building2 className="size-8 text-muted-foreground" />
            )}
          </div>

          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Organization
            </p>

            <h3 className="mt-1 text-xl font-semibold tracking-tight">
              {profile.companyName}
            </h3>

            {profile.designation && (
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <BriefcaseBusiness className="size-3.5" />
                {profile.designation}
              </p>
            )}
          </div>
        </div>

        {/* Company Information */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Building2 className="size-4 text-muted-foreground" />
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Company Name</p>

              <p className="mt-1 font-medium">{profile.companyName}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Globe className="size-4 text-muted-foreground" />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Company Website</p>

              {profile.companyWebsite ? (
                <a
                  href={profile.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block truncate font-medium text-primary hover:underline"
                >
                  Visit company website
                </a>
              ) : (
                <p className="mt-1 font-medium">Not added</p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3 sm:col-span-2">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <BriefcaseBusiness className="size-4 text-muted-foreground" />
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Designation</p>

              <p className="mt-1 font-medium">
                {profile.designation || "Not added"}
              </p>
            </div>
          </div>
        </div>

        {profile.companyDescription && (
          <div className="mt-6 border-t border-border/60 pt-6">
            <p className="text-xs font-medium text-muted-foreground">
              About the Company
            </p>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-foreground/80">
              {profile.companyDescription}
            </p>
          </div>
        )}

        {profile.linkedinUrl && (
          <div className="mt-6 border-t border-border/60 pt-6">
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              linkedin
              LinkedIn Profile
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterProfile;

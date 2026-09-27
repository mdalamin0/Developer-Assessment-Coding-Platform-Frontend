import {
  BriefcaseBusiness,
  FileText,

  Phone,
} from "lucide-react";
import { CandidateProfileProps } from "../profile.types";
import { FaGithub, FaLinkedin } from "react-icons/fa";



const CandidateProfile = ({ profile }: CandidateProfileProps) => {
  return (
    <div className="app-card">
      <div className="app-card-header">
        <div>
          <h2 className="font-semibold">Candidate Profile</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Your professional information and experience.
          </p>
        </div>
      </div>

      <div className="app-card-content">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Phone className="size-4 text-muted-foreground" />
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Contact Number</p>
              <p className="mt-1 font-medium">
                {profile.contactNumber || "Not added"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <BriefcaseBusiness className="size-4 text-muted-foreground" />
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Experience</p>
              <p className="mt-1 font-medium">
                {profile.experience || "Not added"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <FaGithub/>
            </div>

            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">GitHub</p>

              {profile.githubUrl ? (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block truncate font-medium text-primary hover:underline"
                >
                  View Github
                </a>
              ) : (
                <p className="mt-1 font-medium">Not added</p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <FaLinkedin/>
            </div>

            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">LinkedIn</p>

              {profile.linkedinUrl ? (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block truncate font-medium text-primary hover:underline"
                >
                  View Linkedin
                </a>
              ) : (
                <p className="mt-1 font-medium">Not added</p>
              )}
            </div>
          </div>
        </div>

        {profile.bio && (
          <div className="mt-6 border-t border-border/60 pt-6">
            <p className="text-xs font-medium text-muted-foreground">About</p>

            <p className="mt-2 text-sm leading-6 text-foreground/80">
              {profile.bio}
            </p>
          </div>
        )}

        {profile.skills.length > 0 && (
          <div className="mt-6 border-t border-border/60 pt-6">
            <p className="text-xs font-medium text-muted-foreground">Skills</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {profile.resumeUrl && (
          <div className="mt-6 border-t border-border/60 pt-6">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <FileText className="size-4" />
              View Resume
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateProfile;

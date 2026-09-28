"use client";

import { useState } from "react";
import ProfileHeader from "./profile-header";
import ProfileAccountInfo from "./profile-account-info";
import CandidateProfile from "./candidate-profile";
import RecruiterProfile from "./recruiter-profile";
import { useGetMe } from "@/features/auth/hooks";
import EditProfileModal from "./edit-profile-modal";

const ProfilePage = () => {
  const { data } = useGetMe();
  const user = data?.data;
  const [editOpen, setEditOpen] = useState(false);

  if (!user) return null;

  return (
    <>
      <section className="page-section">
        <div className="container-app">
          <div className="page-header mb-5">
            <div>
              <h1 className="page-title">Profile</h1>
              <p className="page-description">
                Manage your account and professional information.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <ProfileHeader
              name={user.name}
              email={user.email}
              image={user.image}
              role={user.role}
              onEdit={() => setEditOpen(true)}
            />

            <div className="grid gap-5 lg:grid-cols-2">
              <ProfileAccountInfo
                email={user.email}
                status={user.status}
                provider={user.provider}
                emailVerified={user.emailVerified}
                createdAt={user.createdAt}
              />

              {user.role === "CANDIDATE" && user.profile && (
                <CandidateProfile profile={user.profile} />
              )}

              {user.role === "RECRUITER" && user.profile && (
                <RecruiterProfile profile={user.profile} />
              )}
            </div>
          </div>
        </div>
      </section>
      <EditProfileModal
        open={editOpen}
        onOpenChange={setEditOpen}
        user={user}
      />
    </>
  );
};

export default ProfilePage;

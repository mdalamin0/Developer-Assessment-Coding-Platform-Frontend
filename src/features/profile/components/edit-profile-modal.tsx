"use client";
import Modal from "@/components/shared/modal";
import CandidateEditForm from "./candidate-edit-form";
import { EditProfileModalProps } from "../profile.types";
import RecruiterEditForm from "./recruiter-edit-form";
import AdminEditForm from "./admin-edit-form";


const EditProfileModal = ({
  open,
  onOpenChange,
  user,
}: EditProfileModalProps) => {
  const handleSuccess = () => {
    onOpenChange(false);
  };
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Profile"
      description="Update your profile information."
      mode="form"
    >
      {" "}
      {user.role === "CANDIDATE" && (
        <CandidateEditForm
          name={user.name}
          email={user.email}
          contactNumber={user.profile.contactNumber}
          bio={user.profile.bio}
          skills={user.profile.skills}
          experience={user.profile.experience}
          githubUrl={user.profile.githubUrl}
          linkedinUrl={user.profile.linkedinUrl}
          resumeUrl={user.profile.resumeUrl}
          onSuccess={handleSuccess}
        />
      )}{" "}
      {user.role === "RECRUITER" && (
        <RecruiterEditForm
          name={user.name}
          email={user.email}
          companyName={user.profile.companyName}
          companyWebsite={user.profile.companyWebsite}
          companyDescription={user.profile.companyDescription}
          designation={user.profile.designation}
          companyLogo={user.profile.companyLogo}
          onSuccess={handleSuccess}
        />
      )}{" "}
      {user.role === "ADMIN" && (
        <AdminEditForm
          name={user.name}
          email={user.email}
          onSuccess={handleSuccess}
        />
      )}{" "}
    </Modal>
  );
};
export default EditProfileModal;

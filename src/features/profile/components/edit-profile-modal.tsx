"use client";
import Modal from "@/components/shared/modal";
import CandidateEditForm from "./candidate-edit-form";
import { EditProfileModalProps } from "../profile.types";


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
        <div className="py-8 text-center text-sm text-muted-foreground">
          {" "}
          Recruiter profile form will be added here.{" "}
        </div>
      )}{" "}
      {user.role === "ADMIN" && (
        <div className="py-8 text-center text-sm text-muted-foreground">
          {" "}
          Admin profile form will be added here.{" "}
        </div>
      )}{" "}
    </Modal>
  );
};
export default EditProfileModal;

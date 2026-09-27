import { UserRound } from 'lucide-react';
import React from 'react';

const ProfileError = () => {
  return (
    <section className="page-section">
      <div className="container-app">
        <div className="empty-state">
          <UserRound className="mx-auto size-10 text-muted-foreground" />
          <h2 className="mt-4 text-lg font-semibold">Unable to load profile</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            We could not load your profile information.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProfileError;
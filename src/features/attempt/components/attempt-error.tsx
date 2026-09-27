import React from 'react';

const AttemptError = () => {
  return (
    <section className="min-h-screen bg-background">
      <div className="container-app py-12">
        <div className="mx-auto max-w-xl text-center">
          <div className="app-card p-8">
            <h1 className="text-lg font-semibold">Unable to load assessment</h1>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              We could not load the assessment. Please try again.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttemptError;
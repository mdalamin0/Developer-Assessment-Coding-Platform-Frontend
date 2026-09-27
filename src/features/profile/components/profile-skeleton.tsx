import { Skeleton } from '@/components/ui/skeleton';


const ProfileSkeleton = () => {
  return (
    <section className="page-section">
      <div className="container-app">
        <div className="page-header">
          <div>
            <Skeleton className="h-8 w-32" />
            <Skeleton className="mt-2 h-5 w-72 max-w-full" />
          </div>
        </div>

        <div className="space-y-5">
          <div className="app-card p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <Skeleton className="size-20 rounded-full" />

              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-44" />
                <Skeleton className="h-4 w-56" />
                <Skeleton className="h-5 w-24 rounded-full" />
              </div>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="app-card p-6">
              <Skeleton className="h-5 w-40" />
              <div className="mt-6 space-y-5">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>

            <div className="app-card p-6">
              <Skeleton className="h-5 w-40" />
              <div className="mt-6 space-y-5">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSkeleton;
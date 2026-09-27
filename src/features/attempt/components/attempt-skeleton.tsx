/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { Skeleton } from '@/components/ui/skeleton';


const AttemptSkeleton = () => {
  return (
   <section className="min-h-screen bg-background">
           <div className="container-app py-6 sm:py-8">
             <div className="mx-auto max-w-5xl space-y-6">
               <div className="space-y-3">
                 <Skeleton className="h-7 w-72" />
                 <Skeleton className="h-4 w-96 max-w-full" />
               </div>
   
               <div className="app-card p-5 sm:p-7">
                 <div className="space-y-6">
                   <Skeleton className="h-5 w-28" />
                   <Skeleton className="h-8 w-3/4" />
                   <Skeleton className="h-20 w-full" />
   
                   <div className="grid gap-4 sm:grid-cols-2">
                     {Array.from({ length: 4 }).map((_, index) => (
                       <Skeleton key={index} className="h-20 rounded-xl" />
                     ))}
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </section>
  );
};

export default AttemptSkeleton;
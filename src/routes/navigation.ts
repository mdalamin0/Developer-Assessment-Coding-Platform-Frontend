import { UserRole } from "@/features/auth/auth.types";
import { candidateRoutes } from "./candidate.routes";
import { recruiterRoutes } from "./recruiter.routes";
import { adminRoutes } from "./admin.routes";


export const dashboardNavigation = {
  [UserRole.CANDIDATE]: candidateRoutes ,
  [UserRole.RECRUITER]: recruiterRoutes ,
  [UserRole.ADMIN]: adminRoutes,
} as const;

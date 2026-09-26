import { useQuery } from "@tanstack/react-query"
import { getRecruiterCandidates } from "../candidate.api"
import { CanidateParams } from "../candidate.types"

export const useRecruiterCandidates = (params: CanidateParams) => {
return useQuery({
  queryKey: ["candidates", params],
  queryFn: () => getRecruiterCandidates(params)
})
}
import { useQuery } from "@tanstack/react-query";
import { MyResultsQuery } from "../results.types";
import { getMyResults } from "../results.api";


export const useGetMyResults = (params: MyResultsQuery) => {
  return useQuery({
    queryKey: ["my-results", params],
    queryFn: () => getMyResults(params),
  });
};

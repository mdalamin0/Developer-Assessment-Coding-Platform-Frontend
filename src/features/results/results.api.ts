import apiClient from "@/lib/apiClient";
import { MyResultsQuery } from "./results.types";



export const getMyResults = (query?: MyResultsQuery) => {
  return apiClient("/results/my-results", {
    method: "GET",
    query,
  });
};

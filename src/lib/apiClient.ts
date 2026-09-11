import { ofetch } from "ofetch";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiClient = ofetch.create({
  baseURL: BASE_API_URL,
});

export default apiClient;
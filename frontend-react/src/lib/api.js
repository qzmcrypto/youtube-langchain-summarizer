import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function analyzeVideo(url) {
  try {
    const response = await apiClient.post("/summarize", { video_url: url });
    return response.data;
  } catch (err) {
    const message =
      err.response?.data?.detail ||
      err.message ||
      "Failed to analyze video. Please try again.";
    throw new Error(message, { cause: err });
  }
}

export default apiClient;

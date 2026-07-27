const STORAGE_KEY = "lecturelens.recentLectures";
const MAX_ENTRIES = 5;

export function getRecentLectures() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveRecentLecture({ videoUrl, summaryData }) {
  try {
    const existing = getRecentLectures().filter((entry) => entry.videoUrl !== videoUrl);
    const entry = {
      videoUrl,
      title: summaryData?.metadata?.title || "Untitled lecture",
      channel: summaryData?.metadata?.channel || "",
      thumbnail: summaryData?.metadata?.thumbnail_url || "",
      summaryData,
      savedAt: Date.now(),
    };
    const next = [entry, ...existing].slice(0, MAX_ENTRIES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // localStorage unavailable (private browsing / quota) — persistence is
    // a nice-to-have here, so fail silently rather than breaking the flow.
  }
}

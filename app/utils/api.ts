import Constants from "expo-constants";

// API Keys and Constants
const GOOGLE_API_KEY =
  Constants.expoConfig?.extra?.EXPO_PUBLIC_GOOGLE_API_KEY || "";
const GOOGLE_CX = Constants.expoConfig?.extra?.GOOGLE_CX || "50a9ad4bdf4004982";

interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  pagemap?: {
    metatags?: Array<{
      "og:title"?: string;
      "og:description"?: string;
      "og:image"?: string;
    }>;
  };
}

interface SearchResponse {
  items: SearchResult[];
  searchInformation: {
    totalResults: string;
    searchTime: number;
  };
}

// Google Search API
export const searchGoogle = async (query: string): Promise<SearchResult[]> => {
  if (!GOOGLE_API_KEY) {
    throw new Error(
      "Google API key is not configured. Please check your .env file."
    );
  }

  const URL = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
    query
  )}&key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&num=10`;

  try {
    const response = await fetch(URL);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error?.message || `HTTP error! status: ${response.status}`
      );
    }

    if (!data.items) {
      return [];
    }

    return data.items;
  } catch (error) {
    console.error("Google Search Error:", error);
    throw error;
  }
};

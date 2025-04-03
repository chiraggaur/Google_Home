import Constants from "expo-constants";

const GOOGLE_API_KEY = Constants.expoConfig?.extra?.EXPO_PUBLIC_GOOGLE_API_KEY;
const GOOGLE_CX = Constants.expoConfig?.extra?.GOOGLE_CX;

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
  const URL = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
    query
  )}&key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}`;
  console.log("🔍 Searching Google:", URL);
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: SearchResponse = await response.json();
    return data.items;
  } catch (error) {
    console.error("Google Search Error:", error);
    throw error;
  }
};

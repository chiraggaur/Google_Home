import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { searchGoogle } from "../../utils/api";

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

export default function SearchResults() {
  const router = useRouter();
  const { query } = useLocalSearchParams();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const performSearch = async () => {
      if (query) {
        try {
          setIsLoading(true);
          setError(null);
          const results = await searchGoogle(query as string);
          setSearchResults(results);
        } catch (err) {
          setError("Failed to load search results. Please try again.");
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    performSearch();
  }, [query]);

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#8ab4f8" />
        <Text style={styles.loadingText}>Searching...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => router.back()}
        >
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="#e8eaed" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search Results</Text>
      </View>

      <ScrollView style={styles.resultsContainer}>
        {searchResults.map((result, index) => (
          <TouchableOpacity
            key={index}
            style={styles.resultItem}
            onPress={() => handleLinkPress(result.link)}
          >
            <Text style={styles.resultTitle}>{result.title}</Text>
            <Text style={styles.resultLink}>{result.link}</Text>
            <Text style={styles.resultSnippet}>{result.snippet}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202124",
  },
  centerContainer: {
    flex: 1,
    backgroundColor: "#202124",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#3c4043",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: "#e8eaed",
    fontSize: 18,
    fontWeight: "bold",
  },
  resultsContainer: {
    flex: 1,
    padding: 16,
  },
  resultItem: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: "#303134",
    borderRadius: 8,
  },
  resultTitle: {
    color: "#8ab4f8",
    fontSize: 18,
    marginBottom: 4,
  },
  resultLink: {
    color: "#9aa0a6",
    fontSize: 14,
    marginBottom: 8,
  },
  resultSnippet: {
    color: "#e8eaed",
    fontSize: 14,
    lineHeight: 20,
  },
  loadingText: {
    color: "#e8eaed",
    marginTop: 12,
    fontSize: 16,
  },
  errorText: {
    color: "#e8eaed",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#8ab4f8",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#202124",
    fontSize: 16,
    fontWeight: "bold",
  },
});

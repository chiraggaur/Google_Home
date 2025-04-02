import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import VoiceInputScreen from "./voiceInput";

const VoiceSearchScreen: React.FC = () => {
  const router = useRouter();
  const [transcript, setTranscript] = useState("");

  const handleResult = (result: string) => {
    setTranscript(result);
  };

  const handleError = (error: Error) => {
    console.error("Voice input error:", error);
  };

  const handleSearch = () => {
    if (transcript.trim()) {
      router.push({
        pathname: "../screens/SearchBar",
        params: { query: transcript },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voice Search</Text>

      <VoiceInputScreen />

      {transcript && (
        <>
          <Text style={styles.transcriptLabel}>You said:</Text>
          <Text style={styles.transcriptText}>{transcript}</Text>

          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>
              Search for "{transcript}"
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  transcriptLabel: {
    fontSize: 18,
    marginTop: 30,
    marginBottom: 10,
  },
  transcriptText: {
    fontSize: 16,
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 8,
  },
  searchButton: {
    backgroundColor: "#4285F4",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  searchButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default VoiceSearchScreen;

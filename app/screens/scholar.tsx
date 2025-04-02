import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Platform,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useRouter } from "expo-router";

function ScholarScreen() {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  // Animated values for dots
  const dot1 = new Animated.Value(0);
  const dot2 = new Animated.Value(0);
  const dot3 = new Animated.Value(0);
  const dot4 = new Animated.Value(0);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Audio.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    requestPermission();
  }, []);

  useEffect(() => {
    if (isListening) {
      animateDots();
    }
  }, [isListening]);

  const animateDots = () => {
    const duration = 1500;
    const delay = 200;

    const createAnimation = (value: Animated.Value, delay: number) => {
      return Animated.sequence([
        Animated.delay(delay),
        Animated.loop(
          Animated.sequence([
            Animated.timing(value, {
              toValue: 1,
              duration: duration,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.ease),
            }),
            Animated.timing(value, {
              toValue: 0,
              duration: duration,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.ease),
            }),
          ])
        ),
      ]).start();
    };

    createAnimation(dot1, 0);
    createAnimation(dot2, delay);
    createAnimation(dot3, delay * 2);
    createAnimation(dot4, delay * 3);
  };

  const startRecording = async () => {
    try {
      if (hasPermission === false) {
        Alert.alert(
          "Permission required",
          "Microphone access is needed for voice input"
        );
        return;
      }

      setIsListening(true);
      setTranscript("Listening...");

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(newRecording);
    } catch (error) {
      console.error("Failed to start recording", error);
      setIsListening(false);
      setRecording(null);
      handleError(error instanceof Error ? error : new Error(String(error)));
    }
  };

  const stopRecording = async () => {
    try {
      setIsListening(false);
      setTranscript("Processing...");

      if (!recording) return;

      await recording.stopAndUnloadAsync();
      setRecording(null);

      // Here you would send the recording to a speech recognition service
      // For demo, we'll simulate a response
      setTimeout(() => {
        const demoTranscript = "This is a simulated voice transcript";
        setTranscript(demoTranscript);
        handleTranscriptResult(demoTranscript);
      }, 1000);
    } catch (error) {
      console.error("Failed to stop recording", error);
      handleError(error instanceof Error ? error : new Error(String(error)));
    } finally {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
    }
  };

  useEffect(() => {
    startRecording();
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, []);

  const dotStyle = (animatedValue: Animated.Value) => ({
    opacity: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1],
    }),
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1.2],
        }),
      },
    ],
  });

  const handleTranscriptResult = (text: string) => {
    setTranscript(text);
    router.back();
  };

  const handleError = (error: Error) => {
    console.error("Error:", error);
    Alert.alert("Error", "Failed to record audio");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#e8eaed" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.languageButton}>
          <MaterialIcons name="language" size={24} color="#e8eaed" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Speak now</Text>

        <View style={styles.dotsContainer}>
          <Animated.View style={[styles.dot, styles.blueDot, dotStyle(dot1)]} />
          <Animated.View style={[styles.dot, styles.redDot, dotStyle(dot2)]} />
          <Animated.View
            style={[styles.dot, styles.yellowDot, dotStyle(dot3)]}
          />
          <Animated.View
            style={[styles.dot, styles.greenDot, dotStyle(dot4)]}
          />
        </View>

        <TouchableOpacity
          style={styles.searchSongButton}
          onPress={() => {
            /* Handle song search */
          }}
        >
          <MaterialIcons name="music-note" size={20} color="#e8eaed" />
          <Text style={styles.searchSongText}>Search a song</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202124",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    paddingTop: Platform.OS === "ios" ? 50 : 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#303134",
    justifyContent: "center",
    alignItems: "center",
  },
  languageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#303134",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 100,
  },
  title: {
    color: "#e8eaed",
    fontSize: 32,
    marginBottom: 100,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginBottom: 200,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 6,
  },
  blueDot: {
    backgroundColor: "#4285F4",
  },
  redDot: {
    backgroundColor: "#EA4335",
  },
  yellowDot: {
    backgroundColor: "#FBBC05",
  },
  greenDot: {
    backgroundColor: "#34A853",
  },
  searchSongButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#303134",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  searchSongText: {
    color: "#e8eaed",
    marginLeft: 8,
    fontSize: 16,
  },
});

export default ScholarScreen;

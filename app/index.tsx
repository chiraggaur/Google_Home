// import { Image, StyleSheet, Platform } from "react-native";

// import { HelloWave } from "@/components/HelloWave";
// import ParallaxScrollView from "@/components/ParallaxScrollView";
// import { ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
//       headerImage={
//         <Image
//           source={require("@/assets/images/partial-react-logo.png")}
//           style={styles.reactLogo}
//         />
//       }
//     >
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit{" "}
//           <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
//           to see changes. Press{" "}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({
//               ios: "cmd + d",
//               android: "cmd + m",
//               web: "F12",
//             })}
//           </ThemedText>{" "}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//         <ThemedText>
//           Tap the Explore tab to learn more about what's included in this
//           starter app.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           When you're ready, run{" "}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{" "}
//           to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
//           directory. This will move the current{" "}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: "absolute",
//   },
// });

///

import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import styles from "./styles/homeStyles";
import { SvgUri } from "react-native-svg";

type AppRoute = "./screens/scholar" | "./screens/music" | "./screens/translate";

const quickLinks = [
  { icon: "🎓", label: "Scholar", route: "./screens/scholar" as AppRoute },
  { icon: "🎵", label: "Music", route: "./screens/music" as AppRoute },
  { icon: "🌐", label: "Translate", route: "./screens/translate" as AppRoute },
] as const;

export default function HomePage() {
  const router = useRouter();
  const { searchQuery } = useLocalSearchParams<{ searchQuery?: string }>();

  useEffect(() => {
    if (searchQuery) {
      // Handle the search query from voice input
      console.log("Received search query:", searchQuery);
      // You can implement the search functionality here
    }
  }, [searchQuery]);

  const weatherData = {
    city: "Gurugram",
    temperature: "30°",
    condition: "Clear",
    icon: "🌙",
  };

  const airQuality = {
    value: 170,
    level: "Moderate",
    icon: "💨",
  };

  const newsCard = {
    image: "https://picsum.photos/400/200",
    title:
      "Ocean's blue color comes from light absorption: Red and yellow wavelengths are absorbed, while blue is reflected back to our eyes.",
  };

  return (
    <ScrollView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <MaterialIcons name="science" size={24} color="#8ab4f8" />
        {/* <View style={styles.searchBarMini}>
          <MaterialIcons name="search" size={24} color="#8ab4f8" />
          <Text style={styles.searchText}>Search</Text>
          <MaterialIcons name="auto-awesome" size={24} color="#8ab4f8" />
        </View> */}
        <TouchableOpacity style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
        </TouchableOpacity>
        <View style={styles.searchBarMini}>
          <Text style={styles.dot}>⋮</Text>
        </View>
      </View>

      {/* Google Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={{
            uri: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png",
          }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Search Bar */}
      {/* <Link href={"./screens/SearchBar"} asChild> */}
      <TouchableOpacity
        style={styles.searchBar}
        onPress={() => router.push("/screens/SearchBar")}
      >
        <MaterialIcons name="search" size={24} color="#8ab4f8" />
        <Text style={styles.searchBarText}>Search</Text>
        <View style={styles.searchIcons}>
          <TouchableOpacity onPress={() => router.push("/screens/voiceInput")}>
            <MaterialIcons name="mic" size={28} color="#8ab4f8" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/screens/open-camera")}>
            {/* <MaterialIcons name="camera-alt" size={24} color="#8ab4f8" /> */}
            <Image
              source={require("../assets/images/google-lens-stroke-rounded.png")}
              style={styles.lensIcon}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {/* </Link> */}

      {/* Quick Links */}
      <View style={styles.quickLinks}>
        {quickLinks.map((link, index) => (
          <Link key={index} href={link.route} asChild>
            <TouchableOpacity style={styles.quickLink}>
              <Text style={styles.quickLinkIcon}>{link.icon}</Text>
              <Text style={styles.quickLinkLabel}>{link.label}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>

      {/* Weather and Air Quality Cards */}
      <View style={styles.infoCards}>
        <View style={styles.weatherCard}>
          <Text style={styles.cardTitle}>{weatherData.city}</Text>
          <View style={styles.weatherInfo}>
            <Text style={styles.temperature}>{weatherData.temperature}</Text>
            <Text style={styles.weatherIcon}>{weatherData.icon}</Text>
          </View>
        </View>

        <View style={styles.airQualityCard}>
          <Text style={styles.cardTitle}>Air quality · {airQuality.value}</Text>
          <View style={styles.aqiInfo}>
            <Text style={styles.aqiLevel}>{airQuality.level}</Text>
            <Text style={styles.aqiIcon}>{airQuality.icon}</Text>
          </View>
        </View>
      </View>

      {/* News Card */}
      <TouchableOpacity style={styles.newsCard}>
        <Image source={{ uri: newsCard.image }} style={styles.newsImage} />
        <Text style={styles.newsTitle}>{newsCard.title}</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="home" size={24} color="#8ab4f8" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="update" size={24} color="#8ab4f8" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="notifications" size={24} color="#8ab4f8" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="menu" size={24} color="#8ab4f8" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

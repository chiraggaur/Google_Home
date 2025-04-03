// import React, { useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   Image,
//   ScrollView,
//   FlatList,
// } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";
// import { Link, useRouter, useLocalSearchParams } from "expo-router";
// import styles from "./styles/homeStyles";

// type AppRoute = "./screens/scholar" | "./screens/music" | "./screens/translate";

// const quickLinks = [
//   { icon: "🎓", label: "Scholar", route: "./screens/scholar" as AppRoute },
//   { icon: "🎵", label: "Music", route: "./screens/music" as AppRoute },
//   { icon: "🌐", label: "Translate", route: "./screens/translate" as AppRoute },
// ] as const;

// export default function HomePage() {
//   const router = useRouter();
//   const { searchQuery } = useLocalSearchParams<{ searchQuery?: string }>();

//   useEffect(() => {
//     if (searchQuery) {
//       // Handle the search query from voice input
//       console.log("Received search query:", searchQuery);
//       // You can implement the search functionality here
//     }
//   }, [searchQuery]);

//   const weatherData = {
//     city: "Gurugram",
//     temperature: "30°",
//     condition: "Clear",
//     icon: "🌙",
//   };

//   const airQuality = {
//     value: 170,
//     level: "Moderate",
//     icon: "💨",
//   };

//   const newsCards = [
//     {
//       id: "1",
//       image: "https://picsum.photos/400/200?random=1",
//       title: "The ocean appears blue due to light absorption and scattering.",
//     },
//     {
//       id: "2",
//       image: "https://picsum.photos/400/200?random=2",
//       title: "Scientists discover a new species of deep-sea creatures.",
//     },
//     {
//       id: "3",
//       image: "https://picsum.photos/400/200?random=3",
//       title: "Climate change is affecting marine biodiversity significantly.",
//     },
//     {
//       id: "4",
//       image: "https://picsum.photos/400/200?random=4",
//       title: "Coral reefs are vital ecosystems, but they are under threat.",
//     },
//   ];

//   return (
//     <ScrollView style={styles.container}>
//       {/* Top Bar */}
//       <View style={styles.topBar}>
//         <MaterialIcons name="science" size={24} color="#8ab4f8" />
//         {/* <View style={styles.searchBarMini}>
//           <MaterialIcons name="search" size={24} color="#8ab4f8" />
//           <Text style={styles.searchText}></Text>
//           <MaterialIcons name="auto-awesome" size={24} color="#8ab4f8" />
//         </View> */}
//         <TouchableOpacity style={styles.avatar}>
//           <Text style={styles.avatarText}>A</Text>
//         </TouchableOpacity>
//         <View style={styles.searchBarMini}>
//           <Text style={styles.dot}>⋮</Text>
//         </View>
//       </View>

//       {/* Google Logo */}
//       <View style={styles.logoContainer}>
//         <Image
//           source={{
//             uri: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png",
//           }}
//           style={styles.logo}
//           resizeMode="contain"
//         />
//       </View>

//       {/* Search Bar */}
//       {/* <Link href={"./screens/SearchBar"} asChild> */}
//       <TouchableOpacity
//         style={styles.searchBar}
//         onPress={() => router.push("/screens/SearchBar")}
//       >
//         <MaterialIcons name="search" size={24} color="#8ab4f8" />
//         <Text style={styles.searchBarText}>Search</Text>
//         <View style={styles.searchIcons}>
//           <TouchableOpacity onPress={() => router.push("/screens/voiceInput")}>
//             <MaterialIcons name="mic" size={28} color="#8ab4f8" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => router.push("/screens/open-camera")}>
//             {/* <MaterialIcons name="camera-alt" size={24} color="#8ab4f8" /> */}
//             <Image
//               source={require("../app/assets/images/google-lens-stroke-rounded.png")}
//               style={styles.lensIcon}
//             />
//           </TouchableOpacity>
//         </View>
//       </TouchableOpacity>
//       {/* </Link> */}

//       {/* Quick Links */}
//       <View style={styles.quickLinks}>
//         {quickLinks.map((link, index) => (
//           <Link key={index} href={link.route} asChild>
//             <TouchableOpacity style={styles.quickLink}>
//               <Text style={styles.quickLinkIcon}>{link.icon}</Text>
//               <Text style={styles.quickLinkLabel}>{link.label}</Text>
//             </TouchableOpacity>
//           </Link>
//         ))}
//       </View>

//       {/* Weather and Air Quality Cards */}
//       <View style={styles.infoCards}>
//         <View style={styles.weatherCard}>
//           <Text style={styles.cardTitle}>{weatherData.city}</Text>
//           <View style={styles.weatherInfo}>
//             <Text style={styles.temperature}>{weatherData.temperature}</Text>
//             <Text style={styles.weatherIcon}>{weatherData.icon}</Text>
//           </View>
//         </View>

//         <View style={styles.airQualityCard}>
//           <Text style={styles.cardTitle}>Air quality · {airQuality.value}</Text>
//           <View style={styles.aqiInfo}>
//             <Text style={styles.aqiLevel}>{airQuality.level}</Text>
//             <Text style={styles.aqiIcon}>{airQuality.icon}</Text>
//           </View>
//         </View>
//       </View>

//       {/* News Card */}
//       {/* <FlatList
//         data={newsCards}
//         keyExtractor={(item) => item.id}
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.newsCard}>
//             <Image source={{ uri: item.image }} style={styles.newsImage} />
//             <Text style={styles.newsTitle}>{item.title}</Text>
//           </TouchableOpacity>
//         )}
//       /> */}

//       {/* Bottom Navigation */}
//       <View style={styles.bottomNav}>
//         <TouchableOpacity style={styles.navItem}>
//           <MaterialIcons name="home" size={24} color="#8ab4f8" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem}>
//           <MaterialIcons name="update" size={24} color="#8ab4f8" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem}>
//           <MaterialIcons name="notifications" size={24} color="#8ab4f8" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem}>
//           <MaterialIcons name="menu" size={24} color="#8ab4f8" />
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }

//

import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import styles from "./styles/homeStyles";

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
      console.log("Received search query:", searchQuery);
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

  const newsCards = [
    {
      id: "1",
      image: "https://picsum.photos/400/200?random=1",
      title: "The ocean appears blue due to light absorption and scattering.",
    },
    {
      id: "2",
      image: "https://picsum.photos/400/200?random=2",
      title: "Scientists discover a new species of deep-sea creatures.",
    },
    {
      id: "3",
      image: "https://picsum.photos/400/200?random=3",
      title: "Climate change is affecting marine biodiversity significantly.",
    },
    {
      id: "4",
      image: "https://picsum.photos/400/200?random=4",
      title: "Coral reefs are vital ecosystems, but they are under threat.",
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={newsCards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.newsCard}>
            <Image source={{ uri: item.image }} style={styles.newsImage} />
            <Text style={styles.newsTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
        ListHeaderComponent={
          <>
            {/* Top Bar */}
            <View style={styles.topBar}>
              <MaterialIcons name="science" size={24} color="#8ab4f8" />
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
            <TouchableOpacity
              style={styles.searchBar}
              onPress={() => router.push("/screens/SearchBar")}
            >
              <MaterialIcons name="search" size={24} color="#8ab4f8" />
              <Text style={styles.searchBarText}>Search</Text>
              <View style={styles.searchIcons}>
                <TouchableOpacity
                  onPress={() => router.push("/screens/voiceInput")}
                >
                  <MaterialIcons name="mic" size={28} color="#8ab4f8" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => router.push("/screens/open-camera")}
                >
                  <Image
                    source={require("../app/assets/images/google-lens-stroke-rounded.png")}
                    style={styles.lensIcon}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

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
                  <Text style={styles.temperature}>
                    {weatherData.temperature}
                  </Text>
                  <Text style={styles.weatherIcon}>{weatherData.icon}</Text>
                </View>
              </View>

              <View style={styles.airQualityCard}>
                <Text style={styles.cardTitle}>
                  Air quality · {airQuality.value}
                </Text>
                <View style={styles.aqiInfo}>
                  <Text style={styles.aqiLevel}>{airQuality.level}</Text>
                  <Text style={styles.aqiIcon}>{airQuality.icon}</Text>
                </View>
              </View>
            </View>
          </>
        }
        ListFooterComponent={
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
        }
      />
    </View>
  );
}

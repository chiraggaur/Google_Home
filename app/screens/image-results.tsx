import { View, Text, Image, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";

interface SearchResult {
  id: string;
  title: string;
  source: string;
  thumbnail: string;
}

export default function ImageResultsScreen() {
  const { imageUri } = useLocalSearchParams<{ imageUri: string }>();

  // Mock data for demonstration
  const results: SearchResult[] = [
    {
      id: "1",
      title: "Similar Image 1",
      source: "example.com",
      thumbnail: "https://via.placeholder.com/150",
    },
    {
      id: "2",
      title: "Similar Image 2",
      source: "example.com",
      thumbnail: "https://via.placeholder.com/150",
    },
    {
      id: "3",
      title: "Similar Image 3",
      source: "example.com",
      thumbnail: "https://via.placeholder.com/150",
    },
    {
      id: "4",
      title: "Similar Image 4",
      source: "example.com",
      thumbnail: "https://via.placeholder.com/150",
    },
  ];

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Image
          source={{ uri: imageUri }}
          style={{ width: 200, height: 200, borderRadius: 8 }}
        />
        <Text style={{ marginTop: 8 }}>Your uploaded image</Text>
      </View>

      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Visual matches
      </Text>

      <FlatList
        data={results}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flex: 1, margin: 8, alignItems: "center" }}>
            <Image
              source={{ uri: item.thumbnail }}
              style={{ width: 150, height: 150, borderRadius: 8 }}
            />
            <Text style={{ marginTop: 4 }} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={{ fontSize: 12, color: "gray" }}>{item.source}</Text>
          </View>
        )}
      />
    </View>
  );
}

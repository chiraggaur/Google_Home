import { useEffect, useState } from "react";
import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import axios from "axios";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  source: string;
  thumbnail: string;
}

export default function ImageResultsScreen() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [randomImage, setRandomImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products?limit=10"
        );
        const products = response.data.products.map((product: any) => ({
          id: product.id.toString(),
          title: product.title,
          description: product.description,
          thumbnail: product.thumbnail,
        }));

        setResults(products);

        // Pick a random image from the products list
        if (products.length > 0) {
          const randomIndex = Math.floor(Math.random() * products.length);
          setRandomImage(products[randomIndex].thumbnail);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: "#121212",
      }}
    >
      {/* Randomly Picked "Uploaded" Image */}
      {randomImage && (
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Image
            source={{ uri: randomImage }}
            style={{ width: 200, height: 200, borderRadius: 8 }}
          />
          <Text style={{ marginTop: 8, color: "#fff", fontSize: 16 }}>
            Dummy Image
          </Text>
        </View>
      )}

      {/* Visual Matches Section */}
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: "#fff",
          marginBottom: 10,
        }}
      >
        Visual matches
      </Text>

      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#00FF76" />
        </View>
      ) : (
        <FlatList
          data={results}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                margin: 8,
                padding: 12,
                backgroundColor: "#1e1e1e",
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: item.thumbnail }}
                style={{ width: 150, height: 150, borderRadius: 8 }}
              />
              <Text
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "gray",
                  textAlign: "center",
                  marginTop: 4,
                }}
              >
                {item.description}
              </Text>
              <Text style={{ fontSize: 12, color: "#0096FF", marginTop: 4 }}>
                {item.source}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

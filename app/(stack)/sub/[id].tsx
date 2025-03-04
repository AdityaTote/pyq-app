import { useLocalSearchParams, useNavigation } from "expo-router";
import axios, { AxiosError } from "axios";
import { Link } from "expo-router";
import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { BACKEND_URL } from "@/constants/config";
import { useEffect, useLayoutEffect, useState } from "react";
import { ISubData } from "@/types/types";

export default function SubScreen() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<ISubData>();
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation();

  async function fetchYear() {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/sem/${id}`);
      setData(response.data.data);
    } catch (e) {
      console.log(e);
      if (e instanceof AxiosError) {
        setMessage(e.response?.data.message);
      } else {
        setMessage("An error occurred while fetching data.");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchYear();
  }, []);

  useLayoutEffect(() => {
    if (data?.title) {
      navigation.setOptions({
        headerTitle: data.title,
        headerShown: true,
      });
    }
  }, [data, navigation]);

  return (
    <ScrollView contentContainerStyle={!data ? styles.scrollViewContent : {}}>
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0066cc" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : data ? (
          data.subject.map((d) => (
            <View key={d._id} style={styles.outlinedView}>
              <Link href={`../paper/${d._id}`}>
                <Text style={styles.text}>{d.title}</Text>
              </Link>
            </View>
          ))
        ) : (
          <View style={styles.error}>
            <Text style={styles.errorMessage}>{message || "No data available"}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  link: {
    marginVertical: 8,
  },
  error: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorMessage: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  outlinedView: {
    height: 80,
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#eaeaea",
    paddingHorizontal: 16,
    marginTop: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});
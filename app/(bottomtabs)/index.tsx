import axios, { AxiosError } from "axios";
import { Link } from "expo-router";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { BACKEND_URL } from "@/constants/config";
import { useEffect, useState } from "react";
import { IYearData } from "@/types/types";

export default function Home() {
  const [data, setData] = useState<IYearData[]>();
  const [message, setMessage] = useState<string>();

  async function fetchYear() {
    try {
      const response = await axios.get(`${BACKEND_URL}/year`);
      setData(response.data.data);
    } catch (e) {
      console.log(e);
      if (e instanceof AxiosError) {
        console.log(e.response);
        setMessage(e.response?.data.message || e.message);
      } else {
        setMessage("An error occurred while fetching data.");
      }
    }
  }

  useEffect(() => {
    fetchYear();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {data ? (
          data.map((d) => (
            <View key={d._id} style={styles.outlinedView}>
              <Link href={`./sem/${d._id}`}>
                <Text style={styles.text}>{d.title}</Text>
              </Link>
            </View>
          ))
        ) : (
          <View style={styles.error}>
            <Text style={styles.errorMessage}>{message}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  link: {
    marginVertical: 8,
  },
  error: {
    width: "auto",
    height: "auto",
    display: "flex",
  },
  errorMessage: {
    justifyContent: "center",
    alignContent: "center",
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

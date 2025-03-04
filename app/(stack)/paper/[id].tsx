import { useLocalSearchParams, useNavigation } from "expo-router";
import axios, { AxiosError } from "axios";
import * as WebBrowser from "expo-web-browser";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useEffect, useLayoutEffect, useState } from "react";
import { IPaperData } from "@/types/types";
import { BACKEND_URL } from "@/constants/config";

export default function PaperScreen() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<IPaperData>();
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation();

  async function fetchYear() {
    setLoading(true);
    try {
      console.log(`${BACKEND_URL}/sub/${id}`);
      const response = await axios.get(`${BACKEND_URL}/sub/${id}`);
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

  const openPDF = async (pdfUrl: string) => {
      try {
        // Open the PDF in the device's default browser
        await WebBrowser.openBrowserAsync(pdfUrl);
      } catch (error) {
        console.error("Error opening PDF:", error);
        // Handle any errors that might occur
        Alert.alert("Error", "Could not open the PDF. Please try again.");
      }
    };

  return (
    <ScrollView contentContainerStyle={!data ? styles.scrollViewContent : {}}>
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0066cc" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : data ? (
          data.paper.map((d) => (
            <View key={d._id} style={styles.outlinedView}>
              <TouchableOpacity
                style={styles.paperButton}
                onPress={() => openPDF(d.link)}
              >
                <Text style={styles.paperButtonText}>{data.title}</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.error}>
            <Text style={styles.errorMessage}>
              {message || "No data available"}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorMessage: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#d9534f',
  },
  outlinedView: {
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden', // Ensures content stays within rounded corners
  },
  paperButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  paperButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  paperButtonPressed: {
    backgroundColor: '#2980b9', // Slightly darker blue when pressed
  },
});
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import PDF from "react-native-pdf";
import axios, { AxiosError } from "axios";
import { IPDFViewer } from "@/types/types";
import { BACKEND_URL } from "@/constants/config";

export default function PaperView() {
  
}


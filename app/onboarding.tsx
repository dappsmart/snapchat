import { Image, StyleSheet, Platform, View, Button, Alert } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import tw from "twrnc";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
//import LinearGradient from "react-native-linear-gradient";
//import MaskedView from "@react-native-community/masked-view";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

import { usePermissions } from "expo-media-library";
import { useCameraPermissions, useMicrophonePermissions } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function OnboardingScreen() {
  const [cameraPermissions, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] =
    useMicrophonePermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    usePermissions();

  async function handleContinue() {
    const allPermissions = await requestAllPermissions();
    if (allPermissions) {
      // navigation tabs
      router.replace("/(tabs)");
    } else {
      Alert.alert("To continue please provide permissions in settings");
    }
  }
  async function requestAllPermissions() {
    const cameraStatus = await requestCameraPermission();
    if (!cameraStatus.granted) {
      Alert.alert("Error", "Camera permissions is required");
      return false;
    }

    const microphoneStatus = await requestMicrophonePermission();
    if (!microphoneStatus.granted) {
      Alert.alert("Error", "Microphone permissions is required");
      return false;
    }
    const mediaLibraryStatus = await requestMediaLibraryPermission();
    if (!mediaLibraryStatus.granted) {
      Alert.alert("Error", "MediaLibrary permissions is required");
      return false;
    }
    await AsyncStorage.setItem("hasOpened", "true");
    return true;
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <View style={tw` justify-center flex-1`}>
          <LinearGradient colors={["#08FF08", "#CCFF00", "#FFFF00"]}>
            <MaterialIcons name="linked-camera" size={324} color="#FFFF00" />

            <Image
              source={require("@/assets/images/symbol.png")}
              style={styles.reactLogo}
            />
          </LinearGradient>
        </View>
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Snapchat Camera!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView>
        <ThemedText>
          Welcome to SnapChat! To provide the best experience, this app requires
          permissions for the following:
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Camera Permissions</ThemedText>
        <ThemedText>🛸🎥📽️🔭For taking pictures</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Microphone Permissions</ThemedText>
        <ThemedText>🎙️🎤For taking videos with audio</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Media Library Permissions</ThemedText>
        <ThemedText>📷📸📹To save/view your amazing shots</ThemedText>
      </ThemedView>

      <Button
        title="Continue"
        onPress={() => {
          handleContinue
        }}
      ></Button>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 250,
    width: 790,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  gradienticon: {
    // gradientBegin="#DBFF00",
    // gradientEnd="#f5ba57",
    // gradientDirection="diagonal",
    height: 250,
    width: 790,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  buttonContainer: {
    backgroundColor: "transparent",
  },
});

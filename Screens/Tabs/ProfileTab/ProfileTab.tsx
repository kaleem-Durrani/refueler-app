import {
  View,
  Text,
  VStack,
  Avatar,
  AvatarImage,
  AvatarFallbackText,
  ScrollView,
  Pressable,
  SafeAreaView,
} from "@gluestack-ui/themed";
import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { PERCENT, COLORS } from "../../../Constants/Constants";
import ProfileCard from "./components/ProfileCard";
import { Entypo, Octicons, AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import employeeApis from "../../../api/employee";
import useApi from "../../../hooks/useApi";

// import { GoogleSignin } from "@react-native-google-signin/google-signin";
import useAuth from "../../../auth/useAuth";
import useProfile from "../../../hooks/useProfile";

export default function ProfileTab({ navigation }: any) {
  const { logOut } = useAuth();
  const { profile } = useProfile();
  const [image, setImage] = useState(null);
  const uploadImageApi = useApi(employeeApis.uploadImage);

  const uploadProfile = async (cropped) => {
    await uploadImageApi.request(cropped);
  };

  useEffect(() => {
    if (uploadImageApi.data) {
      console.log("Image uploaded successfully");
    }
    if (uploadImageApi.error) {
      console.log("Error uploading image: ", uploadImageApi.error);
    }
  }, [uploadImageApi.data, uploadImageApi.error]);

  const pickImage = async (source) => {
    let result;
    if (source === "camera") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status === "granted") {
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.25,
        });
      } else {
        alert("Sorry, we need camera permissions to make this work!");
        return;
      }
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.25,
      });
    }

    if (!result.canceled) {
      const base64Image = await convertImageToBase64(result.assets[0].uri);
      uploadProfile(base64Image);
      setImage(base64Image);
    }
  };

  const convertImageToBase64 = async (uri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return `data:image/jpeg;base64,${base64}`;
    } catch (error) {
      console.error("Error converting image to base64:", error);
      return null;
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      "Select Image Source",
      "",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Camera", onPress: () => pickImage("camera") },
        { text: "Gallery", onPress: () => pickImage("gallery") },
      ],
      { cancelable: true }
    );
  };

  const confirmLogOut = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log Out",
        onPress: () => {
          handleLogOut();
        },
      },
    ]);
  };

  const handleLogOut = () => {
    logOut();
  };

  return (
    <SafeAreaView flex={1}>
      <VStack style={styles.container}>
        <TouchableOpacity
          style={styles.logOutButton}
          onPress={() => confirmLogOut()}
        >
          <Octicons name="sign-out" size={PERCENT[7]} color="white" />
        </TouchableOpacity>

        <Text style={[styles.title, styles.textShadow]}>Profile</Text>

        <View style={styles.profileArea}>
          <Avatar style={styles.avatar} bgColor="$info400" size="2xl">
            <AvatarFallbackText style={styles.textShadow}>
              {profile?.name}
            </AvatarFallbackText>
            <AvatarImage
              source={{
                uri:
                  image ||
                  profile?.imageUrl ||
                  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
              }}
              alt="user photo"
            />
            <Pressable onPress={showImagePickerOptions}>
              <Entypo
                name="camera"
                size={35}
                style={{ marginLeft: PERCENT[25], marginTop: PERCENT[8] }}
                color={COLORS.tertiary}
              />
            </Pressable>
          </Avatar>

          <Text style={styles.name}>{profile?.name}</Text>
          <Text style={styles.email}>{profile?.email}</Text>

          <ScrollView w={"100%"}>
            <ProfileCard
              title={"Personal Detail"}
              semiTitle={"Name, Phone no, Email"}
              iconName={"user"}
              iconColor={"#373737"}
              iconBgColor={"#ffedd5"}
              onPress={() => navigation.navigate("Personal Detail")}
            />
            {profile.type === "manager" && (
              <ProfileCard
                title={"Loyalty Screen"}
                iconName={"coins"}
                iconColor={"#FFD700"}
                iconBgColor={"#ffedd5"}
                onPress={() => navigation.navigate("Loyalty Screen")}
              />
            )}
            <ProfileCard
              title={"Change Password"}
              // semiTitle={"Name, Phone no, Email"}
              iconName={"lock"}
              iconColor={"#1A91FF"}
              iconBgColor={"#CCE9FF"}
              onPress={() => navigation.navigate("PasswordChange")}
            />
            <ProfileCard
              title={"FAQs"}
              semiTitle={"Frequently asked questions"}
              iconName={"clipboard-question"}
              iconColor={"#22c55e"}
              iconBgColor={"#dcfce7"}
              onPress={() => navigation.navigate("FAQ")}
            />
            <ProfileCard
              title={"Log Out"}
              // semiTitle={"Frequently asked questions"}
              iconName={"door-open"}
              iconColor={"#8b5cf6"}
              iconBgColor={"#ddd6fe"}
              onPress={() => confirmLogOut()}
            />
          </ScrollView>
        </View>
      </VStack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.tertiary,
    flex: 1,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: PERCENT[13],
    alignSelf: "center",
    paddingVertical: PERCENT[10],
  },
  textShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.4)", // Shadow color
    textShadowOffset: { width: 2, height: 3 }, // Shadow offset
    textShadowRadius: 3, // Shadow radius
  },
  name: {
    color: COLORS.tertiary,
    fontWeight: "bold",
    fontSize: PERCENT[5],
  },
  email: {
    color: "gray",
    fontSize: PERCENT[3],
    marginBottom: "3%",
  },
  profileArea: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    marginTop: "20%",
    alignItems: "center",
    borderTopLeftRadius: PERCENT[13],
    borderTopRightRadius: PERCENT[13],
    elevation: 10,
  },
  avatar: {
    borderRadius: PERCENT[100],
    marginTop: "-15%",
    elevation: 10,
  },
  cameraButton: {
    alignSelf: "flex-end",
    backgroundColor: "#0ea5e9",
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: "4%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "white",
  },
  logOutButton: {
    position: "absolute",
    top: PERCENT[13],
    right: PERCENT[4],
    padding: "2%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 2,

    borderRadius: PERCENT[100],
  },
});

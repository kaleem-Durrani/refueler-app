import {
  View,
  Text,
  VStack,
  Avatar,
  AvatarImage,
  AvatarFallbackText,
  ScrollView,
  SafeAreaView,
} from "@gluestack-ui/themed";
import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { PERCENT, COLORS } from "../../../Constants/Constants";
import ProfileCard from "./components/ProfileCard";
import { Octicons } from "@expo/vector-icons";
import { AuthContext } from "../../../Contexts/AuthContext";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function ProfileTab({ navigation }: any) {
  const { user, setUser } = useContext(AuthContext);
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUser(null);
      console.log("Google sign out");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView flex={1}>
      <VStack style={styles.container}>
        <TouchableOpacity style={styles.logOutButton} onPress={() => signOut()}>
          <Octicons name="sign-out" size={PERCENT[7]} color="white" />
        </TouchableOpacity>

        <Text style={[styles.title, styles.textShadow]}>Profile</Text>

        <View style={styles.profileArea}>
          <Avatar style={styles.avatar} bgColor="$info400" size="2xl">
            <AvatarFallbackText style={styles.textShadow}>
              {user.user.name}
            </AvatarFallbackText>
            <AvatarImage
              source={{
                uri: user.user.photo,
              }}
              alt="user photo"
            />
            <TouchableOpacity style={styles.cameraButton}>
              <AntDesign
                style={styles.textShadow}
                name="camerao"
                size={PERCENT[7]}
                color="white"
              />
            </TouchableOpacity>
          </Avatar>

          <Text style={styles.name}>{user.user.name}</Text>
          <Text style={styles.email}>{user.user.email}</Text>

          <ScrollView w={"100%"}>
            <ProfileCard
              title={"Personal Detail"}
              semiTitle={"Name, Phone no, Email"}
              iconName={"user"}
              iconColor={"#f97316"}
              iconBgColor={"#ffedd5"}
              onPress={() => navigation.navigate("Personal Detail")}
            />
            <ProfileCard
              title={"Change Password"}
              // semiTitle={"Name, Phone no, Email"}
              iconName={"lock"}
              iconColor={"#1A91FF"}
              iconBgColor={"#CCE9FF"}
              onPress={() => navigation.navigate("PasswordChange")}
            />
            <ProfileCard
              title={"Notifications"}
              // semiTitle={"Name, Phone no, Email"}
              iconName={"paper-plane"}
              iconColor={"#eab308"}
              iconBgColor={"#fef9c3"}
              onPress={() => navigation.navigate("Notifications")}
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
              title={"Sign Out"}
              // semiTitle={"Frequently asked questions"}
              iconName={"door-open"}
              iconColor={"#8b5cf6"}
              iconBgColor={"#ddd6fe"}
              onPress={() => signOut()}
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

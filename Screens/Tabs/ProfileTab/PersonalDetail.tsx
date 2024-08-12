import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  VStack,
  Input,
  InputSlot,
  InputField,
  Button,
  ButtonText,
  HStack,
  Text,
} from "@gluestack-ui/themed";
import { MaterialIcons } from "@expo/vector-icons";
import { PERCENT, COLORS } from "../../../Constants/Constants";
import useAuth from "../../../auth/useAuth";
import PersonalDetailCard from "./components/PersonalDetailCard";
import useProfile from "../../../hooks/useProfile";

export default function PersonalDetail({ navigation }: any) {
  const { user } = useAuth();
  const { profile } = useProfile();

  return (
    <View style={styles.container}>
      <HStack justifyContent="center" alignItems="center">
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons
            name="arrow-back-ios"
            size={PERCENT[9]}
            color="white"
          />
        </TouchableOpacity>
        <Text style={styles.title}>Personal Details</Text>
      </HStack>
      {/* <VStack style={styles.formContainer}></VStack> */}

      <VStack mt={"$4"}>
        <PersonalDetailCard title="Name" info={profile?.name} />
        <PersonalDetailCard title="Email" info={profile?.email} />
        <PersonalDetailCard title="Phone Number" info={profile?.phoneNumber} />
        <PersonalDetailCard title="Account Type" info={profile?.type} />
        <PersonalDetailCard
          title="Member Since"
          info={profile?.createdAt.slice(0, 10)}
        />
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.tertiary,
    padding: "6%",
  },
  backButton: {
    position: "absolute",
    top: PERCENT[2],
    left: PERCENT[2],
    padding: "2%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
  },
  title: {
    marginTop: "20%",
    alignSelf: "center",
    color: "white",
    fontSize: PERCENT[10],
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 3,
  },
  formContainer: {
    backgroundColor: "white",
    borderRadius: PERCENT[6],
    padding: PERCENT[6],
    elevation: 10,
    marginTop: "10%",
  },
  label: {
    color: COLORS.activeText,
    fontSize: PERCENT[4],
    alignSelf: "flex-start",
    marginLeft: PERCENT[2],
    fontWeight: "bold",
    marginBottom: PERCENT[1],
  },
});

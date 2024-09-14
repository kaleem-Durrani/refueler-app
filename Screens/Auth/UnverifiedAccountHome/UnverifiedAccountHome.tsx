import {
  Button,
  ButtonText,
  HStack,
  View,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import React, { useRef, useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { COLORS, HEIGHT, PERCENT } from "../../../Constants/Constants";
import { FontAwesome } from "@expo/vector-icons";
import { NetworkStatusBadge } from "../../../components/NetworkStatusBadge";
import useAuth from "../../../auth/useAuth";

const UnverifiedAccountHome = ({ navigation }: any) => {
  const auth = useAuth();

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
    auth.logOut();
  };

  return (
    <View bg={COLORS.primary} flex={1} p={"$6"}>
      <View position="absolute" top={0} right={0} p={"$4"}>
        <TouchableOpacity style={{ zIndex: 1 }} onPress={() => confirmLogOut()}>
          <FontAwesome
            name="sign-out"
            size={PERCENT[12]}
            color={COLORS.tertiary}
          />
          <Text size="2xs">Logout</Text>
        </TouchableOpacity>
        <NetworkStatusBadge />
      </View>

      <Text color={COLORS.tertiary} bold size="2xl">
        Welcome Dear User
      </Text>

      <VStack alignItems="center">
        <Text size="xl" mt={"$12"}>
          Your Account Status:{" "}
        </Text>

        {auth.user.isVerified ? (
          <Text mt={"$2"} bold size="2xl" color="green">
            Verified
          </Text>
        ) : (
          <>
            <Text mt={"$2"} bold size="2xl" color="red">
              Unverified{" "}
            </Text>
            <Text bold mt={"$3"}>
              AND
            </Text>
          </>
        )}
      </VStack>

      <Text color="red" bold alignSelf="center" mt={"$3"}>
        {!auth.user.pumpId ? "Not Assigned to a Pump" : ""}
      </Text>

      <VStack mt={"$20"} alignItems="center">
        <Text size="lg">To continue using the App</Text>

        {!auth.user.isVerified && (
          <>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("VerifyAccount");
              }}
            >
              <Text mt={"$2"} size="xl" bold color={COLORS.tertiary}>
                {" "}
                Verify Account
              </Text>
            </TouchableOpacity>
            <Text bold size={"lg"} mt={"$3"}>
              AND
            </Text>
          </>
        )}

        <Text lineHeight={"$lg"} mt={"$3"} textAlign="center">
          Ask your Manager {"\n"} to assign you to the pump {"\n"}
          or contact our admins
        </Text>
      </VStack>
    </View>
  );
};

export default UnverifiedAccountHome;

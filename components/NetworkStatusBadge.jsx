// NetworkStatusBadge.js
import React from "react";
import { Badge, BadgeText } from "@gluestack-ui/themed";
import { useNetworkStatus } from "../hooks/useNetworkStatus";
import Entypo from "@expo/vector-icons/Entypo";
import { StatusBar } from "react-native";

export const NetworkStatusBadge = () => {
  const isConnected = useNetworkStatus();

  if (isConnected) return null;

  return (
    <Badge
      variant="solid"
      action="error"
      style={{
        position: "absolute",
        top: "90%",
        left: "25%",
        // width: "100%",
        zIndex: 10000,
      }}
    >
      <BadgeText>No Internet Connection</BadgeText>
      <Entypo name="warning" size={24} color="red" />
    </Badge>
  );
};

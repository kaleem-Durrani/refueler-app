// NetworkStatusBadge.js
import React from "react";
import { Badge, BadgeText, BadgeIcon } from "@gluestack-ui/themed";
import { useNetworkStatus } from "../hooks/useNetworkStatus";
import Entypo from "@expo/vector-icons/Entypo";

export const NetworkStatusBadge = () => {
  const isConnected = useNetworkStatus();

  if (isConnected) return null;

  return (
    <Badge
      variant="solid"
      action="error"
      style={{
        position: "relative",
        top: 0,
        width: "100%",
        // right: "40%",
        zIndex: 10000,
      }}
    >
      <BadgeText>No Internet Connection</BadgeText>
      <Entypo name="warning" size={24} color="red" />
    </Badge>
  );
};

import { View, Text } from "@gluestack-ui/themed";
import React from "react";
import { TouchableOpacity } from "react-native";
import { COLORS } from "../../../../Constants/Constants";

export default function FilterText(props: any) {
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderRadius: 20,
        marginHorizontal: 5,
        padding: 6,
        borderColor: COLORS.button,
        backgroundColor: "white",
        elevation: 3,
      }}
    >
      <Text color={COLORS.primary}>{props.text}</Text>
    </TouchableOpacity>
  );
}

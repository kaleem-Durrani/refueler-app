import { View, Text } from "@gluestack-ui/themed";
import React from "react";
import { TouchableOpacity } from "react-native";
import { COLORS } from "../../../../Constants/Constants";

export default function MyButton(props: any) {
  return props.disabled ? (
    <View
      style={{
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        padding: 6,
        borderWidth: 2,
        borderColor: "lightgray",
      }}
    >
      <Text color={"lightgray"}>{props.text}</Text>
    </View>
  ) : (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        padding: 6,
        borderWidth: 1,
        borderColor: COLORS.primary,
      }}
    >
      <Text color={COLORS.primary}>{props.text}</Text>
    </TouchableOpacity>
  );
}

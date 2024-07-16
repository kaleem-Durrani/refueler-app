import { View, Text } from "@gluestack-ui/themed";
import React from "react";
import { TouchableOpacity } from "react-native";
import { COLORS, PERCENT } from "../../../../Constants/Constants";

export default function FilterText(props: any) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        borderWidth: 1,
        borderRadius: 20,
        marginHorizontal: 5,
        padding: PERCENT[2],
        paddingHorizontal: PERCENT[3],

        borderColor: COLORS.tertiary,
        backgroundColor: props.filter === props.text ? COLORS.text : "white",

        elevation: 6,
      }}
    >
      {props.filter === props.text ? (
        <Text color={"white"}>{props.text}</Text>
      ) : (

        <Text color={COLORS.text}>{props.text}</Text>

      )}

      {/* <Text color={COLORS.primary}>{props.text}</Text> */}
    </TouchableOpacity>
  );
}

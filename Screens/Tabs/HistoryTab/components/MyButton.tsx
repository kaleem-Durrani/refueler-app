import { View, Text, Image } from "@gluestack-ui/themed";
import React from "react";
import { TouchableOpacity } from "react-native";
import { COLORS, PERCENT } from "../../../../Constants/Constants";

export default function MyButton(props: any) {
  return props.disabled ? (
    <View
      style={{
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        flex: props.currentChoice === props.myChoice ? 3 : 2,
        overflow: "hidden",
        elevation: 20,
        opacity: 0.6,
      }}
    >
      <Image
        w={"100%"}
        backgroundColor={"rgba(0,0,0,0.6)"}
        resizeMode="contain"
        alt="something"
        source={props.image}
      />
    </View>
  ) : (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        flex: props.currentChoice === props.myChoice ? 3 : 2,
        overflow: "hidden",
        elevation: 20,
      }}
    >
      <Image
        w={"100%"}
        backgroundColor={
          props.currentChoice == props.myChoice ? "#7dd3fc" : "#7dd3fc"
        }
        resizeMode="contain"
        alt="something"
        source={props.image}
      />
      {/* <Text>hi</Text> */}
    </TouchableOpacity>
  );
}

// #7dd3fc

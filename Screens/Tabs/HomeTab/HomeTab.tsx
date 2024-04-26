import {
  View,
  Text,
  Button,
  ButtonText,
  ButtonIcon,
} from "@gluestack-ui/themed";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../Constants/Constants";

export default function HomeTab() {
  return (
    <View bg="white" flex={1} alignItems="center" justifyContent="space-around">
      <Text>HomeTab</Text>
      {/* Camera */}
      <View elevation={5} bg="lightcyan" height={"$96"} width={"$72"}>
        <View
          flex={1}
          // borderColor="lightgray"
          // borderWidth={5}
          alignItems="center"
          justifyContent="center"
        >
          <Text>Camera</Text>
        </View>
      </View>
      <Button mt={"$16"} bg={COLORS.button} gap={10} alignItems="center">
        <ButtonIcon>
          <Ionicons name="camera" size={20} color="white" />
        </ButtonIcon>
        <ButtonText>Scan Code</ButtonText>
      </Button>
    </View>
  );
}

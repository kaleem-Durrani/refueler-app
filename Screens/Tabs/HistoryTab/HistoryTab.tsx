import { View, Text, Button, ButtonText, Center } from "@gluestack-ui/themed";
import React, { useState } from "react";
import RefuelerHistory from "./RefuelerHistory";
import ManagerHistory from "./ManagerHistory";
import EmployeeManagement from "./EmployeeManagement";

import Ionicons from "@expo/vector-icons/Ionicons";

import { StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../../../Constants/Constants";
import MyButton from "./components/MyButton";

export default function HistoryTab() {
  const [choice, setChoice] = useState(1);

  return (
    <View bg="white" display="flex" flex={1}>
      <View
        bg="white"
        borderRadius={10}
        flexDirection="row"
        justifyContent="space-around"
        m={"$3"}
        py={"$3"}
        elevation={5}
      >
        <MyButton text={"My History"} onPress={() => setChoice(1)} />
        <MyButton text={"Employee History"} onPress={() => setChoice(2)} />
        <MyButton text={"Management"} onPress={() => setChoice(3)} />
      </View>

      <View flex={1} bg="white">
        {choice == 1 ? (
          <RefuelerHistory />
        ) : choice == 2 ? (
          <ManagerHistory />
        ) : (
          <EmployeeManagement />
        )}
      </View>
    </View>
  );
}

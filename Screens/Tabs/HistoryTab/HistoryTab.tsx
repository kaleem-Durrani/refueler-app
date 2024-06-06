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
    <View display="flex" flex={1} bg="white">
      <View
        bg="$info500"
        // borderRadius={20}
        borderBottomLeftRadius={30}
        borderBottomRightRadius={30}
        flexDirection="row"
        // justifyContent="space-around"
        px={"$2"}
        py={"$5"}
        gap={"$1"}
        mb={"$3"}
        mt={"-$2"}
        elevation={5}
      >
        <MyButton
          text={"My History"}
          image={require("../../../assets/images/MyRecord.png")}
          currentChoice={choice}
          myChoice={1}
          onPress={() => setChoice(1)}
        />
        <MyButton
          text={"Employee History"}
          image={require("../../../assets/images/EmployeeRecord.png")}
          currentChoice={choice}
          myChoice={2}
          onPress={() => setChoice(2)}
        />
        <MyButton
          text={"Management"}
          image={require("../../../assets/images/EmployeeManagement.png")}
          currentChoice={choice}
          myChoice={3}
          onPress={() => setChoice(3)}
          // disabled
        />
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

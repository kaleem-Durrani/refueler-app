import { View, Text, ScrollView } from "@gluestack-ui/themed";
import React from "react";
import EmployeeSwitch from "./components/EmployeeSwitch";

export default function EmployeeManagement() {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <EmployeeSwitch name={"Jamil Khan"} />
        <EmployeeSwitch name={"Asad Bhai"} />
        <EmployeeSwitch name={"Jabbar Ustad"} />
        <EmployeeSwitch name={"Agha Zwan"} />
        <EmployeeSwitch name={"Aa Bal Zwan"} />
        <EmployeeSwitch name={"Imran Khan"} />
        <EmployeeSwitch name={"Nawaz Sharif"} />
        <EmployeeSwitch name={"Aa bal zmaa zui"} />
        <EmployeeSwitch name={"Wo Agha"} />
        <EmployeeSwitch name={"Gwal kako"} />
      </ScrollView>
    </View>
  );
}

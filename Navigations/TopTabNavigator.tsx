
import { View, Text, SafeAreaView } from "@gluestack-ui/themed";

import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import RefuelerHistory from "../Screens/Tabs/HistoryTab/RefuelerHistory";
import ManagerHistory from "../Screens/Tabs/HistoryTab/ManagerHistory";
import EmployeeManagement from "../Screens/Tabs/HistoryTab/EmployeeManagement";

import { PERCENT } from "../Constants/Constants";


const Tab = createMaterialTopTabNavigator();

export default function TopTabNavigator() {
  return (

    <SafeAreaView flex={1}>
      <Tab.Navigator>
        <Tab.Screen name="My History" component={RefuelerHistory} />
        <Tab.Screen name="Manager History" component={ManagerHistory} />
        <Tab.Screen name="Employee Management" component={EmployeeManagement} />
      </Tab.Navigator>
    </SafeAreaView>

  );
}

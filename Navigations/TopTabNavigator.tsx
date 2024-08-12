import { View, Text, SafeAreaView } from "@gluestack-ui/themed";

import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import RefuelerHistory from "../Screens/Tabs/HistoryTab/RefuelerHistory";
import ManagerHistory from "../Screens/Tabs/HistoryTab/ManagerHistory";
import EmployeeManagement from "../Screens/Tabs/HistoryTab/EmployeeManagement";

import { PERCENT } from "../Constants/Constants";
import useProfile from "../hooks/useProfile";

const Tab = createMaterialTopTabNavigator();

export default function TopTabNavigator() {
  const { profile } = useProfile();

  return (
    <SafeAreaView flex={1}>
      <Tab.Navigator>
        {profile?.type === "manager" ? (
          <Tab.Group>
            <Tab.Screen name="My History" component={RefuelerHistory} />
            <Tab.Screen name="Manager History" component={ManagerHistory} />
            <Tab.Screen
              name="Employee Management"
              component={EmployeeManagement}
            />
          </Tab.Group>
        ) : (
          <Tab.Screen name="My History" component={RefuelerHistory} />
        )}
      </Tab.Navigator>
    </SafeAreaView>
  );
}

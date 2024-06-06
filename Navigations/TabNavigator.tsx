import React from "react";
import { View, Text, HStack } from "@gluestack-ui/themed";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeTab from "../Screens/Tabs/HomeTab/HomeTab";
import HistoryTab from "../Screens/Tabs/HistoryTab/HistoryTab";
import ProfileTab from "../Screens/Tabs/ProfileTab/ProfileTab";
import { COLORS, PERCENT, SIZES } from "../Constants/Constants";
import TopTabNavigator from "./TopTabNavigator";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          {
            // color: "transparent",
            backgroundColor: "#f0f9ff",
            display: "flex",
            borderRadius: 100,
            marginHorizontal: PERCENT[5],
            marginVertical: PERCENT[2],
            elevation: 10,
            height: PERCENT[14],
          },
          null,
        ],
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          let iconColor = focused ? COLORS.white : "gray";
          let circleColor = focused ? "#38bdf8" : "transparent";

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "History") {
            iconName = "time";
          } else if (route.name === "Profile") {
            iconName = "person";
          }

          // Return the Ionicons component with the appropriate icon name, color, and size
          return focused ? (
            <HStack
              alignItems="center"
              w={"80%"}
              h={"$12"}
              borderRadius="$full"
              backgroundColor={circleColor}
              justifyContent="space-evenly"
            >
              <Ionicons name={iconName} size={size} color={iconColor} />
              <Text fontWeight="bold" color="white" mr={"$1"}>
                {route.name}
              </Text>
            </HStack>
          ) : (
            <View alignContent="center">
              <View
                w={"$12"}
                h={"$12"}
                borderRadius="$full"
                backgroundColor={circleColor}
                justifyContent="center"
                alignItems="center"
              >
                <Ionicons name={iconName} size={size} color={iconColor} />
              </View>
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeTab} />
      <Tab.Screen name="History" component={TopTabNavigator} />
      <Tab.Screen name="Profile" component={ProfileTab} />
    </Tab.Navigator>
  );
}

{
  /* <View alignContent="center">
              <View
                w={"$12"}
                h={"$12"}
                borderRadius="$full"
                backgroundColor={circleColor}
                justifyContent="center"
                alignItems="center"
              >
                <Ionicons name={iconName} size={size} color={iconColor} />
              </View>
            </View> */
}

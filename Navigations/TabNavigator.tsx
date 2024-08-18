import React, { useEffect, useState } from "react";
import { View, HStack } from "@gluestack-ui/themed";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Animated, Keyboard } from "react-native";

import HomeTab from "../Screens/Tabs/HomeTab/HomeTab";
import HistoryTab from "../Screens/Tabs/HistoryTab/HistoryTab";
import ProfileTab from "../Screens/Tabs/ProfileTab/ProfileTab";
import LoyaltyProgramTab from "../Screens/Tabs/LoyaltyTab/LoyaltyProgramTab";
import { COLORS, PERCENT, SIZES } from "../Constants/Constants";
import TopTabNavigator from "./TopTabNavigator";
import useProfile from "../hooks/useProfile";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const [path, setPath] = useState("Home");
  const [isAnimating, setIsAnimating] = useState(false);
  const [opacity, setOpacity] = useState(new Animated.Value(0));
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const { profile, fetchProfile } = useProfile();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardOpen(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
    fetchProfile();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: COLORS.tertiary,
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          {
            backgroundColor: "#f0f9ff",
            display: isKeyboardOpen ? "none" : "flex",

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

          let iconColor = focused ? COLORS.primary : "gray";
          let circleColor = focused ? COLORS.tertiary : "transparent";

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "History") {
            iconName = "time";
          } else if (route.name === "Profile") {
            iconName = "person";
          } else if (route.name === "Loyalty") {
            iconName = "cash";
          }

          useEffect(() => {
            setIsAnimating(false);
            Animated.timing(opacity, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }).start();
          }, [path]);

          return focused ? (
            <HStack alignItems="center">
              {!isAnimating && (
                <Animated.View style={{ opacity: opacity }}>
                  <View
                    bg={`${COLORS.tertiary}`}
                    p={"$2"}
                    borderRadius={"$full"}
                  >
                    <Ionicons
                      name={iconName}
                      size={PERCENT[7]}
                      color={iconColor}
                    />
                  </View>
                </Animated.View>
              )}

              <Animated.Text
                style={{ marginLeft: 4, color: COLORS.tertiary, opacity }}
              >
                {!isAnimating && route.name}
              </Animated.Text>
            </HStack>
          ) : (
            <Ionicons name={iconName} size={PERCENT[7]} color={iconColor} />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeTab}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            if (path !== "Home") {
              e.preventDefault();
              setIsAnimating(true);
              setOpacity(new Animated.Value(0));
              setPath("Home");
              navigation.navigate("Home");
            }
          },
        })}
      />
      <Tab.Screen
        name="History"
        component={TopTabNavigator}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            if (path !== "History") {
              e.preventDefault();
              setIsAnimating(true);
              setOpacity(new Animated.Value(0));
              setPath("History");
              navigation.navigate("History");
            }
          },
        })}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileTab}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            if (path !== "Profile") {
              e.preventDefault();
              setIsAnimating(true);
              setOpacity(new Animated.Value(0));
              setPath("Profile");
              navigation.navigate("Profile");
            }
          },
        })}
      />

      {profile && profile.type === "manager" && (
        <Tab.Screen
          name="Loyalty"
          component={LoyaltyProgramTab}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              if (path !== "Loyalty Program") {
                e.preventDefault();
                setIsAnimating(true);
                setOpacity(new Animated.Value(0));
                setPath("Loyalty");
                navigation.navigate("Loyalty");
              }
            },
          })}
        />
      )}
    </Tab.Navigator>
  );
}

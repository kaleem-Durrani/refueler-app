// import React from "react";
// import { View, Text, HStack } from "@gluestack-ui/themed";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Ionicons } from "@expo/vector-icons";

// import HomeTab from "../Screens/Tabs/HomeTab/HomeTab";
// import HistoryTab from "../Screens/Tabs/HistoryTab/HistoryTab";
// import ProfileTab from "../Screens/Tabs/ProfileTab/ProfileTab";
// import { COLORS, PERCENT, SIZES } from "../Constants/Constants";
// import TopTabNavigator from "./TopTabNavigator";

// const Tab = createBottomTabNavigator();

// export default function TabNavigator() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarActiveTintColor: COLORS.primary,
//         tabBarInactiveTintColor: "gray",
//         tabBarShowLabel: false,
//         headerShown: false,
//         tabBarHideOnKeyboard: true,
//         tabBarStyle: [
//           {
//             // color: "transparent",
//             backgroundColor: "#f0f9ff",
//             display: "flex",
//             borderRadius: 100,
//             marginHorizontal: PERCENT[5],
//             marginVertical: PERCENT[2],
//             elevation: 10,
//             height: PERCENT[14],
//           },
//           null,
//         ],
//         tabBarIcon: ({ color, size, focused }) => {
//           let iconName;
//           let iconColor = focused ? COLORS.white : "gray";
//           let circleColor = focused ? "#38bdf8" : "transparent";

//           if (route.name === "Home") {
//             iconName = "home";
//           } else if (route.name === "History") {
//             iconName = "time";
//           } else if (route.name === "Profile") {
//             iconName = "person";
//           }

//           // Return the Ionicons component with the appropriate icon name, color, and size
//           return focused ? (
//             <HStack
//               alignItems="center"
//               w={"80%"}
//               h={"$12"}
//               borderRadius="$full"
//               backgroundColor={circleColor}
//               justifyContent="space-evenly"
//             >
//               <Ionicons name={iconName} size={size} color={iconColor} />
//               <Text fontWeight="bold" color="white" mr={"$1"}>
//                 {route.name}
//               </Text>
//             </HStack>
//           ) : (
//             <View alignContent="center">
//               <View
//                 w={"$12"}
//                 h={"$12"}
//                 borderRadius="$full"
//                 backgroundColor={circleColor}
//                 justifyContent="center"
//                 alignItems="center"
//               >
//                 <Ionicons name={iconName} size={size} color={iconColor} />
//               </View>
//             </View>
//           );
//         },
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeTab} />
//       <Tab.Screen name="History" component={TopTabNavigator} />
//       <Tab.Screen name="Profile" component={ProfileTab} />
//     </Tab.Navigator>
//   );
// }

// {
//   /* <View alignContent="center">
//               <View
//                 w={"$12"}
//                 h={"$12"}
//                 borderRadius="$full"
//                 backgroundColor={circleColor}
//                 justifyContent="center"
//                 alignItems="center"
//               >
//                 <Ionicons name={iconName} size={size} color={iconColor} />
//               </View>
//             </View> */
// }

import React, { useEffect, useState } from "react";
import { View, Text, HStack } from "@gluestack-ui/themed";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Animated, Keyboard } from "react-native";

import HomeTab from "../Screens/Tabs/HomeTab/HomeTab";
import HistoryTab from "../Screens/Tabs/HistoryTab/HistoryTab";
import ProfileTab from "../Screens/Tabs/ProfileTab/ProfileTab";
import { COLORS, PERCENT, SIZES } from "../Constants/Constants";
import TopTabNavigator from "./TopTabNavigator";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const [path, setPath] = useState("Home");
  const [isAnimating, setIsAnimating] = useState(false);
  const [opacity, setOpacity] = useState(new Animated.Value(0));
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

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
    </Tab.Navigator>
  );
}

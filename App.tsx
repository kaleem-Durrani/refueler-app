import { decode } from "base-64";
global.atob = decode;

// import "react-native-reanimated";
import "react-native-gesture-handler";
import { config } from "@gluestack-ui/config";
import {
  Box,
  GluestackUIProvider,
  StatusBar,
  View,
} from "@gluestack-ui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { ScrollView } from "react-native";
import TabNavigator from "./Navigations/TabNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Login from "./Screens/Auth/Login/Login";
import Signup from "./Screens/Auth/Signup/Signup";
import { useEffect, useState } from "react";
import PersonalDetail from "./Screens/Tabs/ProfileTab/PersonalDetail";
import Notifications from "./Screens/Tabs/ProfileTab/Notifications";
import FAQ from "./Screens/Tabs/ProfileTab/FAQ";
import PasswordChange from "./Screens/Tabs/ProfileTab/PasswordChange";
import { COLORS } from "./Constants/Constants";
import AuthContext from "./auth/context";
import authStorage from "./auth/storage";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
    setIsReady(true);
  };

  useEffect(() => {
    restoreUser();
  }, []);

  if (!isReady) {
    return null; // Keep rendering null until the app is ready
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <GluestackUIProvider config={config}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <View display="flex" flex={1} bg="transparent">
              <StatusBar
                barStyle="light-content"
                backgroundColor={COLORS.tertiary}
                translucent={false}
              />
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                {user ? (
                  <Stack.Group>
                    <Stack.Screen name="home" component={TabNavigator} />
                    <Stack.Screen
                      name="Personal Detail"
                      component={PersonalDetail}
                    />
                    <Stack.Screen
                      name="Notifications"
                      component={Notifications}
                    />
                    <Stack.Screen
                      name="PasswordChange"
                      component={PasswordChange}
                    />
                    <Stack.Screen name="FAQ" component={FAQ} />
                  </Stack.Group>
                ) : (
                  <Stack.Group>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Signup" component={Signup} />
                  </Stack.Group>
                )}
              </Stack.Navigator>

              {/* <TabNavigator /> */}
              {/* <Login /> */}
              {/* <Signup /> */}
            </View>
          </GestureHandlerRootView>
        </GluestackUIProvider>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

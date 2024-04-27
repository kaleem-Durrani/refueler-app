import "react-native-gesture-handler";
import { config } from "@gluestack-ui/config";
import { Box, GluestackUIProvider, Text, View } from "@gluestack-ui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { ScrollView } from "react-native";
import TabNavigator from "./Navigations/TabNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./Screens/Auth/Login/Login";
import Signup from "./Screens/Auth/Signup/Signup";
import { useState } from "react";
import { AuthContext } from "./Contexts/AuthContext";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <GluestackUIProvider config={config}>
          <View display="flex" flex={1} mt={"$8"} bg="transparent">
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {user ? (
                <Stack.Group>
                  <Stack.Screen name="home" component={TabNavigator} />
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
        </GluestackUIProvider>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

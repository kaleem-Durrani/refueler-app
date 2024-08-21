import { decode } from "base-64";
global.atob = decode;

// import "react-native-reanimated";
import "react-native-gesture-handler";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider, StatusBar, View } from "@gluestack-ui/themed";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./Navigations/TabNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Login from "./Screens/Auth/Login/Login";
import Signup from "./Screens/Auth/Signup/Signup";
import { useEffect, useState } from "react";
import PersonalDetail from "./Screens/Tabs/ProfileTab/PersonalDetail";
import LoyaltyScreen from "./Screens/Tabs/ProfileTab/LoyaltyScreen";
import FAQ from "./Screens/Tabs/ProfileTab/FAQ";
import PasswordChange from "./Screens/Tabs/ProfileTab/PasswordChange";
import { COLORS } from "./Constants/Constants";
import AuthContext from "./auth/context";
import ProfileContext from "./Contexts/ProfileContext";
import authStorage from "./auth/storage";
import UnverifiedAccountHome from "./Screens/Auth/UnverifiedAccountHome/UnverifiedAccountHome";
import VerifyAccount from "./Screens/Auth/VerifyAccount/VerifyAccount";
import EmployeeListContext from "./Contexts/EmployeeListContext";
import AddEmployee from "./Screens/Add Employee/AddEmployee";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [employeesList, setEmployeesList] = useState(null);

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
      <ProfileContext.Provider value={{ profile, setProfile }}>
        <EmployeeListContext.Provider
          value={{ employeesList, setEmployeesList }}
        >
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
                      user.isVerified && user.pumpId ? (
                        <Stack.Group>
                          <Stack.Screen name="home" component={TabNavigator} />
                          <Stack.Screen
                            options={{ animation: "slide_from_right" }}
                            name="Personal Detail"
                            component={PersonalDetail}
                          />
                          <Stack.Screen
                            options={{ animation: "slide_from_right" }}
                            name="Loyalty Screen"
                            component={LoyaltyScreen}
                          />
                          <Stack.Screen
                            options={{ animation: "slide_from_right" }}
                            name="PasswordChange"
                            component={PasswordChange}
                          />
                          <Stack.Screen
                            options={{ animation: "slide_from_right" }}
                            name="FAQ"
                            component={FAQ}
                          />
                          <Stack.Screen
                            options={{ animation: "slide_from_bottom" }}
                            name="AddEmployee"
                            component={AddEmployee}
                          />
                        </Stack.Group>
                      ) : (
                        <Stack.Group>
                          <Stack.Screen
                            options={{ animation: "slide_from_left" }}
                            name="UnverifiedAccountHome"
                            component={UnverifiedAccountHome}
                          />
                          <Stack.Screen
                            options={{ animation: "slide_from_right" }}
                            name="VerifyAccount"
                            component={VerifyAccount}
                          />
                        </Stack.Group>
                      )
                    ) : (
                      <Stack.Group>
                        <Stack.Screen
                          options={{ animation: "slide_from_left" }}
                          name="Login"
                          component={Login}
                        />
                        <Stack.Screen
                          options={{ animation: "slide_from_right" }}
                          name="Signup"
                          component={Signup}
                        />
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
        </EmployeeListContext.Provider>
      </ProfileContext.Provider>
    </AuthContext.Provider>
  );
}

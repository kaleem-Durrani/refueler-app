import "react-native-gesture-handler";
import { config } from "@gluestack-ui/config";
import { Box, GluestackUIProvider, Text, View } from "@gluestack-ui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { ScrollView } from "react-native";
import TabNavigator from "./Navigations/TabNavigator";
import Login from "./Screens/Auth/Login/Login";
import Signup from "./Screens/Auth/Signup/Signup";

export default function App() {
  return (
    <NavigationContainer>
      <GluestackUIProvider config={config}>
        <View display="flex" flex={1} mt={"$8"} bg="transparent">
          <TabNavigator />
          {/* <Login /> */}
          {/* <Signup /> */}
        </View>
      </GluestackUIProvider>
    </NavigationContainer>
  );
}

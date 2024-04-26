import { config } from "@gluestack-ui/config";
import { Box, GluestackUIProvider, Text, View } from "@gluestack-ui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { ScrollView } from "react-native";
import TabNavigator from "./Navigations/TabNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <GluestackUIProvider config={config}>
        <View display="flex" flex={1} mt={"$8"} bg="transparent">
          <TabNavigator />
        </View>
      </GluestackUIProvider>
    </NavigationContainer>
  );
}

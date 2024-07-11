import { Text, VStack, SafeAreaView, ScrollView } from "@gluestack-ui/themed";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import NotificationCard from "./components/NotificationsCard";
import { PERCENT, COLORS } from "../../../Constants/Constants";
import { MaterialIcons } from "@expo/vector-icons";

export default function Notifications({ navigation }: any) {
  const notifications = [
    {
      title: "New Update Available",
      subtitle: "Version 1.2.3 is now available.",
      iconName: "bell",
      iconColor: "#ff9800",
      iconBgColor: "#fff3e0",
    },
    {
      title: "Payment Successful",
      subtitle: "Your payment of Rs. 1000 was successful.",
      iconName: "check-circle",
      iconColor: "#4caf50",
      iconBgColor: "#e8f5e9",
    },
    {
      title: "New Reward Earned",
      subtitle: "You have earned 50 reward points.",
      iconName: "gift",
      iconColor: "#f44336",
      iconBgColor: "#ffebee",
    },
    // Add more notifications here
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <VStack>
          <Text style={styles.title}>Notifications</Text>
          <VStack style={styles.formContainer}>
            {notifications.map((notification, index) => (
              <NotificationCard
                key={index}
                title={notification.title}
                subtitle={notification.subtitle}
                iconName={notification.iconName}
                iconColor={notification.iconColor}
                iconBgColor={notification.iconBgColor}
                onPress={() => console.log("Notification pressed")}
              />
            ))}
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.tertiary,
    padding: PERCENT[6],
  },
  container: {
    flex: 1,
  },
  title: {
    marginTop: "20%",
    alignSelf: "center",
    color: "white",
    fontSize: PERCENT[10],
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 3,
  },
  backButton: {
    position: "absolute",
    top: PERCENT[4],
    left: 0,
    padding: "2%",
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    marginTop: PERCENT[10],
  },
});

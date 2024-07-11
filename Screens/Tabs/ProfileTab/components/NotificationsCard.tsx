import { View, Text } from "@gluestack-ui/themed";
import React from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { PERCENT } from "../../../../Constants/Constants";

export default function NotificationCard(props: any) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View style={styles.iconContainer}>
        <View bg={props.iconBgColor} padding={"20%"} borderRadius={"$full"}>
          <FontAwesome6
            style={{ opacity: 1 }}
            name={props.iconName}
            size={PERCENT[6]}
            color={props.iconColor}
          />
        </View>
      </View>
      <View flex={8}>
        <Text style={styles.title}>{props.title}</Text>
        {props.subtitle ? (
          <Text style={styles.subtitle}>{props.subtitle}</Text>
        ) : null}
      </View>
      <View flex={1}>
        <FontAwesome6 name="chevron-right" size={PERCENT[5]} color="gray" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingHorizontal: PERCENT[2],
    paddingVertical: PERCENT[6],
    alignItems: "center",
    borderRadius: PERCENT[5],
    elevation: 2,
    marginBottom: PERCENT[2],
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
    borderRadius: PERCENT[100],
  },
  title: {
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: PERCENT[3],
    color: "gray",
  },
});

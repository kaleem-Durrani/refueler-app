import { View, Text } from "@gluestack-ui/themed";
import React from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { PERCENT } from "../../../Constants/Constants";

export default function ProfileCard(props: any) {
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
        {props.semiTitle ? (
          <Text style={styles.semiTitle}>{props.semiTitle}</Text>
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
    marginHorizontal: "6%",
    paddingHorizontal: "2%",
    paddingVertical: "4%",
    alignItems: "center",
    borderRadius: PERCENT[5],
    elevation: 2,
    marginBottom: "1.5%",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
    borderRadius: PERCENT[100],
    // backgroundColor: "gray",
  },
  title: {
    fontWeight: "bold",
  },
  semiTitle: {
    fontSize: PERCENT[3],
    color: "gray",
  },
});

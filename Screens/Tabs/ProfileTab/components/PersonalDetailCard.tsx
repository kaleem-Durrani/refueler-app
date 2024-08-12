import { View, Text } from "@gluestack-ui/themed";
import React from "react";
import { COLORS, PERCENT } from "../../../../Constants/Constants";
interface DetailCardProps {
  title: string;
  info: string;
}

const PersonalDetailCard = ({ title, info }: DetailCardProps) => {
  return (
    <View
      style={{
        elevation: 3,
        backgroundColor: "white",
        marginBottom: PERCENT[3],
        borderRadius: 5,
      }}
    >
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
        <Text>{info}</Text>
      </View>
    </View>
  );
};

export default PersonalDetailCard;

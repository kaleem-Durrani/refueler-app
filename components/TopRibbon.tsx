import { View, Text } from "@gluestack-ui/themed";
import React from "react";
import { COLORS, PERCENT } from "../Constants/Constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const TopRibbon = ({ navigation, title }: any) => {
  return (
    <LinearGradient
      colors={[COLORS.secondary, COLORS.primary, COLORS.secondary]}
      start={[0, -1]}
      end={[1, 1]}
      style={{
        elevation: 5,
        overflow: "hidden",
        borderBottomRightRadius: PERCENT[8],
        borderBottomLeftRadius: PERCENT[8],
        zIndex: 1000,
      }}
    >
      <View
        flexDirection="row"
        height={"$24"}
        alignItems="center"
        pl={"$5"}
        pr={"$12"}
        justifyContent="space-between"
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome
            style={{
              textShadowColor: "gray",
              textShadowOffset: { width: 1, height: 3 },
              textShadowRadius: 9,
            }}
            name="chevron-left"
            size={PERCENT[8]}
            color={COLORS.tertiary}
          />
        </TouchableOpacity>
        <Text
          style={{
            textShadowColor: "gray",
            textShadowOffset: { width: 1, height: 4 },
            textShadowRadius: 9,
          }}
          size="2xl"
          fontWeight="bold"
        >
          {title}
        </Text>
      </View>
    </LinearGradient>
  );
};

export default TopRibbon;

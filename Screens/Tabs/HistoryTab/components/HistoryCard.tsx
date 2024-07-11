import { View, Text, HStack, VStack, Divider } from "@gluestack-ui/themed";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { COLORS, PERCENT } from "../../../../Constants/Constants";

{
  /* <FontAwesome6 name="mobile-screen-button" size={24} color="black" />
<FontAwesome6 name="hand-holding-dollar" size={24} color="black" />
<FontAwesome6 name="credit-card" size={24} color="black" /> */
}

export default function HistoryCard(props: any) {
  return (
    <HStack
      bg="white"
      alignItems="center"
      p={"$2"}
      my={"$2"}
      mx={"4%"}
      elevation={5}
      borderRadius={10}
    >
      <View flex={1} alignItems="center">
        {props.paymentBy === "cash" ? (
          <FontAwesome6 name="hand-holding-dollar" size={24} color="#22c55e" />
        ) : props.paymentBy === "app" ? (
          <FontAwesome6
            name="mobile-screen-button"
            size={PERCENT[10]}
            color="black"
          />
        ) : (
          <FontAwesome6 name="credit-card" size={24} color="#6d28d9" />
        )}
      </View>
      <VStack flex={3}>
        <Text color={COLORS.text} size="lg" fontWeight="bold">
          Name
        </Text>
        <Divider h={"$0.5"} w={"$32"} />
        <Text size="sm" color="gray">
          Date
        </Text>
      </VStack>
      <VStack flex={2} alignItems="flex-end" pr={"$1"}>
        <Text size="lg" fontWeight="bold">
          Amount
        </Text>
        <Divider h={"$0.5"} w={"$24"} />
        <Text color="green" size="sm">
          5000 Rs.
        </Text>
      </VStack>
    </HStack>
  );
}

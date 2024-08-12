import { View, Text, HStack, VStack, Divider } from "@gluestack-ui/themed";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { COLORS, PERCENT } from "../../../../Constants/Constants";

export default function HistoryCard({
  paymentBy,
  name,
  date,
  amount,
  fuelType,
  fuelAmount,
  paymentMethod,
}: any) {
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
        {paymentBy === "cash" ? (
          <FontAwesome6 name="hand-holding-dollar" size={24} color="#22c55e" />
        ) : paymentBy === "app" ? (
          <FontAwesome6
            name="mobile-screen-button"
            size={PERCENT[10]}
            color="black"
          />
        ) : (
          <FontAwesome6 name="credit-card" size={24} color="#6d28d9" />
        )}
        <Text color={COLORS.tertiary} size="xs">
          {paymentMethod}
        </Text>
      </View>
      <VStack flex={3}>
        <Text color={COLORS.text} size="sm" fontWeight="bold">
          Sold to: {name}
        </Text>
        <Divider h={"$0.5"} w={"$32"} />
        <Text size="sm" color="gray">
          {date}
        </Text>
        <Divider h={"$0.5"} w={"$32"} />

        <HStack>
          <Text size="sm">Fuel Type: </Text>
          <Text bold color={COLORS.tertiary} size="sm">
            {fuelType}
          </Text>
        </HStack>
      </VStack>
      <VStack flex={2} alignItems="flex-end" pr={"$1"}>
        <Text size="md" fontWeight="bold">
          Amount
        </Text>
        <Divider h={"$0.5"} w={"$16"} />
        <Text color={COLORS.tertiary} bold size="sm">
          {amount} Rs.
        </Text>
        <Divider h={"$0.5"} w={"$16"} />
        <HStack>
          <Text>Litres: </Text>
          <Text color={COLORS.tertiary} bold>
            {fuelAmount}
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
}

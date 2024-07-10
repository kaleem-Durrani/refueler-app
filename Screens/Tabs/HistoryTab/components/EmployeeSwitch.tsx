import {
  View,
  Text,
  HStack,
  Avatar,
  AvatarFallbackText,
  VStack,
  Switch,
  Divider,
} from "@gluestack-ui/themed";
import React from "react";
import { COLORS } from "../../../../Constants/Constants";

export default function EmployeeSwitch(props: any) {
  return (
    <HStack
      bg={"white"}
      borderRadius={10}
      mx={"$6"}
      my={"$1"}
      p={"$2"}
      elevation={5}
      alignItems="center"
    >
      <View flex={1} mr={12}>
        <Avatar bgColor={"$info400"} size="lg" borderRadius="$full">
          <AvatarFallbackText>{props.name}</AvatarFallbackText>
        </Avatar>
      </View>
      <VStack flex={3}>
        <Text fontWeight="bold" color={COLORS.text}>
          {props.name}
        </Text>
        <Divider />
        <Text color={"gray"} size="sm">
          Employee since
        </Text>
      </VStack>
      <View flex={1}>
        <Switch
          size="lg"
          isDisabled={false}
          trackColor={{ false: "#EF4444", true: "#4ade80" }}
        />
      </View>
    </HStack>
  );
}

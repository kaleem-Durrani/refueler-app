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
      mx={"$4"}
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
        {/* <HStack justifyContent="space-between"> */}
        <Text fontWeight="bold" color={COLORS.tertiary}>
          {props.name}
        </Text>
        <Text bold size="xs">
          {props.phoneNumber}
        </Text>
        <Text color="gray" size="xs">
          {props.email}
        </Text>
        {/* </HStack> */}
        <Divider />
        <Text color={"gray"} size="xs">
          Employee since {"\n" + props.createdAt.slice(0, 9)}
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

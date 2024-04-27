import {
  View,
  Text,
  Input,
  InputSlot,
  InputIcon,
  InputField,
  Button,
  ButtonText,
  HStack,
  Divider,
} from "@gluestack-ui/themed";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { PERCENT } from "../../../Constants/Constants";
import { FontAwesome6 } from "@expo/vector-icons";

export default function Signup() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backArrow}>
        <FontAwesome6 name="arrow-left-long" size={40} color="white" />
      </TouchableOpacity>
      <Text style={styles.text}>Sign up</Text>
      <View style={styles.loginArea}>
        <Text>Create your Account</Text>
        <Text>Enter your details below</Text>

        {/* Name input */}

        <Text alignSelf="flex-start">User name</Text>
        <Input
          variant="rounded"
          size="lg"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputSlot ml={"$3"}>
            <FontAwesome6 name="user" size={20} color="gray" />
          </InputSlot>
          <InputField placeholder="Enter your Name" />
        </Input>

        {/* email input */}
        <Text alignSelf="flex-start">Email</Text>
        <Input
          variant="rounded"
          size="lg"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputSlot ml={"$3"}>
            <FontAwesome6 name="envelope" size={20} color="gray" />
          </InputSlot>
          <InputField placeholder="Enter your Email" />
        </Input>

        {/* password input */}

        <Text alignSelf="flex-start">Password</Text>
        <Input
          variant="rounded"
          size="lg"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputSlot ml={"$3"}>
            <FontAwesome6 name="lock" size={20} color="gray" />
          </InputSlot>
          <InputField placeholder="Enter your password" />
          <InputSlot>
            <FontAwesome6 name="eye" size={20} color="gray" />
            <FontAwesome6 name="eye-slash" size={20} color="gray" />
          </InputSlot>
        </Input>

        {/* Confirm Pasword */}

        <Text alignSelf="flex-start">Confirm password</Text>
        <Input
          variant="rounded"
          size="lg"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputSlot ml={"$3"}>
            <FontAwesome6 name="lock" size={20} color="gray" />
          </InputSlot>
          <InputField placeholder="Enter your password" />
          <InputSlot>
            <FontAwesome6 name="eye" size={20} color="gray" />
            <FontAwesome6 name="eye-slash" size={20} color="gray" />
          </InputSlot>
        </Input>

        <HStack alignItems="center">
          <Divider />
          <Text>Or sign up with</Text>
          <Divider />
        </HStack>

        <HStack gap={5}>
          <HStack
            flex={1}
            p={"$3"}
            justifyContent="center"
            gap={10}
            borderWidth={2}
            borderColor="lightgray"
            borderRadius={10}
          >
            <FontAwesome6 name="google" size={24} color="orange" />
            <Text>Google</Text>
          </HStack>
          <HStack
            flex={1}
            p={"$3"}
            justifyContent="center"
            gap={10}
            borderWidth={2}
            borderColor="lightgray"
            borderRadius={10}
          >
            <FontAwesome6 name="facebook" size={24} color="blue" />
            <Text>Facebook</Text>
          </HStack>
        </HStack>

        <HStack>
          <Text>Already have an account ? </Text>
          <TouchableOpacity>
            <Text color="blue">Sign in</Text>
          </TouchableOpacity>
        </HStack>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7dd3fc",
  },
  text: {
    marginTop: "15%",
    alignSelf: "center",
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.4)", // Shadow color
    textShadowOffset: { width: 2, height: 3 }, // Shadow offset
    textShadowRadius: 3, // Shadow radius
  },
  loginArea: {
    flex: 1,
    marginTop: "25%",
    backgroundColor: "white",
    borderTopLeftRadius: PERCENT[15],
    borderTopRightRadius: PERCENT[15],
    elevation: 10,
    alignItems: "center",
    paddingHorizontal: "10%",
  },
  backArrow: {
    position: "absolute",
    margin: "3%",
    zIndex: 5,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});

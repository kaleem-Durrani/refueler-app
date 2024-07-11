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
  ScrollView,
} from "@gluestack-ui/themed";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { PERCENT, COLORS } from "../../../Constants/Constants";
import { MaterialIcons, FontAwesome6 } from "@expo/vector-icons";

export default function Signup({ navigation }: any) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backArrow}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back-ios" size={22} color="white" />
      </TouchableOpacity>
      <Text style={styles.text}>Sign up</Text>

      <View py={"$4"} style={styles.loginArea}>
        <Text style={styles.heading}>Create your Account</Text>

        <Text mt={"$3"} style={styles.subHeading}>
          Enter your details below
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "center" }}
        >
          {/* Name input */}

          <Text mt={"$3"} style={styles.inputLogo}>
            User name
          </Text>
          <Input
            variant="rounded"
            size="lg"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
          >
            <InputSlot ml={"$3"}>
              <MaterialIcons name="person" size={20} color={COLORS.tertiary} />
            </InputSlot>
            <InputField placeholder="Enter your Name" />
          </Input>

          {/* email input */}

          <Text mt={"$3"} style={styles.inputLogo}>
            Email
          </Text>
          <Input
            variant="rounded"
            size="lg"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
          >
            <InputSlot ml={"$3"}>
              <MaterialIcons name="email" size={20} color={COLORS.tertiary} />
            </InputSlot>
            <InputField placeholder="Enter your Email" />
          </Input>

          {/* password input */}

          <Text mt={"$3"} style={styles.inputLogo}>
            Password
          </Text>
          <Input
            variant="rounded"
            size="lg"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
          >
            <InputSlot ml={"$3"}>
              <MaterialIcons
                name="password"
                size={20}
                color={COLORS.tertiary}
              />
            </InputSlot>
            <InputField
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            <InputSlot mr={"$2"}>
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <MaterialIcons
                  name={showPassword ? "visibility" : "visibility-off"}
                  size={24}
                  color={COLORS.tertiary}
                />
              </TouchableOpacity>
            </InputSlot>
          </Input>

          {/* Confirm Pasword */}

          <Text mt={"$3"} style={styles.inputLogo}>
            Confirm password
          </Text>
          <Input
            variant="rounded"
            size="lg"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
          >
            <InputSlot ml={"$3"}>
              <MaterialIcons
                name="password"
                size={20}
                color={COLORS.tertiary}
              />
            </InputSlot>
            <InputField
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            <InputSlot mr={"$2"}>
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <MaterialIcons
                  name={showPassword ? "visibility" : "visibility-off"}
                  size={24}
                  color={COLORS.tertiary}
                />
              </TouchableOpacity>
            </InputSlot>
          </Input>

          <Button
            bg="#0ea5e9"
            mt={"$4"}
            w={"$full"}
            onPress={() => navigation.goBack()}
          >
            <ButtonText>Sign up</ButtonText>
          </Button>

          <HStack mt={"$3"} alignItems="center">
            <Divider />
            <Text>Or sign up with</Text>
            <Divider />
          </HStack>

          <HStack mt={"$3"} gap={5}>
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
              <MaterialIcons name="facebook" size={24} color="blue" />
              <Text>Facebook</Text>
            </HStack>
          </HStack>

          <HStack my={"$4"}>
            <Text>Already have an account ? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.linkText}>Sign in</Text>
            </TouchableOpacity>
          </HStack>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.tertiary,
  },
  text: {
    marginTop: "15%",
    alignSelf: "center",
    color: "white",
    fontSize: PERCENT[10],
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.4)", // Shadow color
    textShadowOffset: { width: 2, height: 3 }, // Shadow offset
    textShadowRadius: 3, // Shadow radius
  },
  loginArea: {
    flex: 1,
    marginTop: "20%",
    backgroundColor: "white",
    borderTopLeftRadius: PERCENT[10],
    borderTopRightRadius: PERCENT[10],
    elevation: 10,
    paddingHorizontal: "10%",
  },
  backArrow: {
    position: "absolute",
    margin: "3%",
    zIndex: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  inputLogo: {

    color: COLORS.tertiary,

    fontSize: PERCENT[4],
    alignSelf: "flex-start",
    marginLeft: PERCENT[3],
    fontWeight: "bold",
    marginBottom: PERCENT[1],
  },
  heading: {
    marginTop: "3%",
    fontWeight: "bold",
    fontSize: PERCENT[8],
    alignSelf: "center",
  },
  subHeading: {
    fontSize: PERCENT[4],
    marginVertical: "3%",
    alignSelf: "center",
  },
  linkText: {
    color: COLORS.activeText,
  },
  textShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.4)", // Shadow color
    textShadowOffset: { width: 2, height: 3 }, // Shadow offset
    textShadowRadius: 3,
  },
  textShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.4)", // Shadow color
    textShadowOffset: { width: 2, height: 3 }, // Shadow offset
    textShadowRadius: 3,
  },
});

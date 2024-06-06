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
import React, { useContext, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { PERCENT } from "../../../Constants/Constants";
import { FontAwesome6 } from "@expo/vector-icons";
import { AuthContext } from "../../../Contexts/AuthContext";

export default function Login({ navigation }: any) {
  const { user, setUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login</Text>
      <View style={styles.loginArea}>
        <Text style={styles.heading}>Welcome Back</Text>
        <Text style={styles.subHeading}>Enter your details below</Text>

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
            <FontAwesome6 name="envelope" size={20} color="gray" />
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
            <FontAwesome6 name="lock" size={20} color="gray" />
          </InputSlot>
          <InputField
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
          />
          <InputSlot mr={"$2"}>
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <FontAwesome6
                name={showPassword ? "eye" : "eye-slash"}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </InputSlot>
        </Input>

        <TouchableOpacity style={{ alignSelf: "flex-end", marginTop: "1%" }}>
          <Text style={styles.linkText}>Forgot your password?</Text>
        </TouchableOpacity>

        {/* sign in button */}

        <Button
          mt={"$5"}
          bg="#0ea5e9"
          w={"$full"}
          onPress={() => setUser(true)}
        >
          <ButtonText>Sign in</ButtonText>
        </Button>

        <HStack alignItems="center" mt={"$3"}>
          <Divider />
          <Text>Or sign in with</Text>
          <Divider />
        </HStack>

        {/* Login with google and facebook */}

        <HStack gap={5} mt={"$4"}>
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

        <HStack mt={"$3"}>
          <Text>Dont have an account ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.linkText}>Sign up</Text>
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
    marginTop: "20%",
    backgroundColor: "white",
    borderTopLeftRadius: PERCENT[15],
    borderTopRightRadius: PERCENT[15],
    elevation: 10,
    alignItems: "center",
    paddingHorizontal: "10%",
  },
  inputLogo: {
    color: "#0ea5e9",
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
  },
  subHeading: {
    fontSize: PERCENT[4],
    marginVertical: "3%",
  },
  linkText: {
    color: "#0ea5e9",
  },
});

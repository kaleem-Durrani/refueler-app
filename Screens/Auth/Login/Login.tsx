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
import { PERCENT, COLORS } from "../../../Constants/Constants";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
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
            <MaterialIcons name="email" size={24} color={COLORS.tertiary} />
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
            <MaterialIcons name="password" size={24} color={COLORS.tertiary} />
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

        <TouchableOpacity style={{ alignSelf: "flex-end", marginTop: "1%" }}>
          <Text style={styles.linkText}>Forgot your password?</Text>
        </TouchableOpacity>

        {/* sign in button */}

        <Button
          mt={"$5"}
          bg={COLORS.tertiary}
          w={"$full"}
          borderRadius={10}
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
            <AntDesign name="google" size={24} color="orange" />
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
    alignItems: "center",
    paddingHorizontal: "10%",
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
  },
  subHeading: {
    fontSize: PERCENT[4],
    marginVertical: "3%",
  },
  linkText: {
    color: COLORS.tertiary,
  },
});

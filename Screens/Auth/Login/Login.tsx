import React, { useState } from "react";
import {
  View,
  Text,
  Input,
  InputSlot,
  LinearGradient,
  Image,
  InputField,
  Button,
  ButtonText,
  HStack,
} from "@gluestack-ui/themed";
import { StyleSheet, TouchableOpacity } from "react-native";
import { PERCENT, COLORS } from "../../../Constants/Constants";
import { MaterialIcons } from "@expo/vector-icons";
import { NetworkStatusBadge } from "../../../components/NetworkStatusBadge";

import authApi from "../../../api/auth";
import useAuth from "../../../auth/useAuth";

export default function Login({ navigation }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // make sure email and password are not empty
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    // verify email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    // make sure password legnth is at least 6
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    const result = await authApi.login(email, password);
    setLoading(false);

    if (!result.ok) {
      alert(`${result.problem} ${result.status}\n
        ${result.data.error}
        `);
      return;
    }
    auth.login(result.data.token);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.tertiary, COLORS.secondary]}
        start={[0.1, 0.7]}
        end={[1, -0.3]}
        style={{
          position: "relative",
          top: 10,
          height: "30%",
          elevation: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <NetworkStatusBadge />
        <Image
          source={require("../../../assets/images//auth/login.png")}
          alt="login"
          size="2xl"
          mb={"$2"}
        />
      </LinearGradient>

      <View py={"$4"} style={styles.loginArea}>
        <Text style={styles.heading}>Welcome Back</Text>
        <Text style={styles.subHeading}>Enter your details below</Text>
        {/* email input */}
        <Text mt={"$3"} style={styles.inputLogo}>
          Email
        </Text>
        <Input variant="underlined" size="lg">
          <InputField
            placeholder="Enter your Email"
            value={email}
            onChangeText={setEmail}
          />
        </Input>
        {/* password input */}
        <Text mt={"$3"} style={styles.inputLogo}>
          Password
        </Text>
        <Input variant="underlined" size="lg">
          <InputField
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
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
        <TouchableOpacity
          style={{
            marginTop: 20,
            alignItems: "flex-end",
          }}
          onPress={() => navigation.navigate("RequestOTP")}
        >
          <Text style={styles.linkText}>Forgot your password ?</Text>
        </TouchableOpacity>
        {/* sign in button */}
        <Button
          mt={"$4"}
          w={"$full"}
          onPress={() => handleLogin()}
          isDisabled={loading}
          borderRadius={20}
        >
          <ButtonText>Sign in</ButtonText>
        </Button>
        <HStack my={"$8"} justifyContent="center">
          <Text>Don't have an account ? </Text>
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
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 3,
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
});

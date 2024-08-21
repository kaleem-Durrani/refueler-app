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
  RadioGroup,
  LinearGradient,
  RadioIndicator,
  Image,
  RadioIcon,
  Radio,
  RadioLabel,
  CircleIcon,
} from "@gluestack-ui/themed";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import { PERCENT, COLORS } from "../../../Constants/Constants";
import { MaterialIcons, FontAwesome6 } from "@expo/vector-icons";
import authApi from "../../../api/auth";

export default function Signup({ navigation }: any) {
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setType] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    // make sure all 6 trimmed fields are not empty

    console.log(name, email, password, phoneNumber, confirmPassword, type);
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === "" ||
      phoneNumber.trim() === "" ||
      type.trim() === ""
    ) {
      Alert.alert("Invalid Input", "Please fill in all the required fields");
      return;
    }

    // verify email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // make sure password is at least 6 characters
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    // make sure password and confirm password match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // make sure phone number is 11 digit long
    if (phoneNumber.length !== 11) {
      alert("Phone number must be 11 digits long");
      return;
    }

    setLoading(true);
    const result = await authApi.signup(
      name,
      email,
      password,
      confirmPassword,
      phoneNumber,
      type
    );
    setLoading(false);

    if (!result.ok) {
      Alert.alert(`${result.problem} ${result.status}`, `${result.data.error}`);
      return;
    }

    Alert.alert("Request Successful", `${result.data.message}`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.tertiary, COLORS.secondary]}
        start={[0.1, 0.7]}
        end={[1, -0.3]}
        style={{
          position: "relative",
          top: 30,
          height: "30%",
          elevation: 5,
          left: 20,
        }}
      >
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color="white" />
        </TouchableOpacity>
        <Image
          source={require("../../../assets/images//auth/signup.png")}
          alt="login"
          size="2xl"
          mb={"$12"}
          style={{
            position: "absolute",
            left: 45,
            elevation: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </LinearGradient>
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

          <Text mt={"$6"} style={styles.inputLogo}>
            User name
          </Text>
          <Input variant="underlined" size="lg" isDisabled={false}>
            <InputField
              placeholder="Enter your Name"
              value={name}
              onChangeText={setName}
            />
          </Input>

          {/* email input */}

          <Text mt={"$4"} style={styles.inputLogo}>
            Email
          </Text>
          <Input variant="underlined" size="lg" isDisabled={false}>
            <InputField
              placeholder="Enter your Email"
              value={email}
              onChangeText={setEmail}
            />
          </Input>

          {/* password input */}

          <Text mt={"$4"} style={styles.inputLogo}>
            Password
          </Text>
          <Input variant="underlined" size="lg" isDisabled={false}>
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

          {/* Confirm Pasword */}

          <Text mt={"$4"} style={styles.inputLogo}>
            Confirm password
          </Text>
          <Input variant="underlined" size="lg" isDisabled={false}>
            <InputField
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
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

          {/* phone Number */}

          <Text mt={"$4"} style={styles.inputLogo}>
            Phone Number
          </Text>
          <Input variant="underlined" size="lg" isDisabled={false}>
            <InputField
              placeholder="Enter your Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </Input>

          {/* Type */}

          <Text mt={"$4"} style={styles.inputLogo}>
            Type
          </Text>
          <RadioGroup
            gap={"$16"}
            flexDirection="row"
            justifyContent="space-between"
            onChange={setType}
          >
            <Radio value="manager" size="lg">
              <RadioIndicator mr="$2">
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>Manager</RadioLabel>
            </Radio>
            <Radio value="refueler" size="lg">
              <RadioIndicator mr="$2">
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>Refueler</RadioLabel>
            </Radio>
          </RadioGroup>

          {/* signup button */}

          <Button
            mt={"$8"}
            w={"$full"}
            borderRadius={20}
            isDisabled={loading}
            onPress={() => handleSignUp()}
          >
            <ButtonText>Sign up</ButtonText>
          </Button>

          <HStack my={"$8"}>
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
    marginLeft: "5%",
    zIndex: 5,
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
});

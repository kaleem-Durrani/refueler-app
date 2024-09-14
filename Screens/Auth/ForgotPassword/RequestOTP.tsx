import {
  Button,
  ButtonText,
  Text,
  Input,
  InputField,
  InputSlot,
} from "@gluestack-ui/themed";
import React, { useEffect, useRef, useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, HEIGHT, PERCENT } from "../../../Constants/Constants";
import useAuth from "../../../auth/useAuth";
import { FontAwesome } from "@expo/vector-icons";
import { NetworkStatusBadge } from "../../../components/NetworkStatusBadge";

import useApi from "../../../hooks/useApi";
import MyToast from "../../../components/MyToast";
import authApis from "../../../api/auth";

interface OTPScreenProps {
  navigation: any;
}

const RequestOTP: React.FC<OTPScreenProps> = ({ navigation }) => {
  const auth = useAuth();

  const verifyOtpForgetPasswordApi = useApi(authApis.verifyOtpForgetPassword);
  const requestPasswordResetApi = useApi(authApis.requestPasswordReset);
  const toast = MyToast();

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [email, setEmail] = useState<string>("");
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) return; // Ensure only a single digit is entered
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
      return;
    }

    if (index === 5 && text !== "") {
      // verifyOtp(newOtp.join(""));
      return;
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index !== 0) {
      inputRefs.current[index - 1]?.focus();
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
    }
  };

  const verifyOtp = async (enteredOtp: string) => {
    if (email) {
      await verifyOtpForgetPasswordApi.request({ otp: enteredOtp, email });
    } else {
      toast.error("Error", "Email address not found");
    }
  };

  // useEffect to handle verify Otp response
  useEffect(() => {
    if (verifyOtpForgetPasswordApi.data) {
      toast.success(`Success`, `${verifyOtpForgetPasswordApi.data.message}`);
      navigation.navigate("ForgotPassword", {
        email: email,
        otp: otp.join(""),
      });
      return;
    }
    if (verifyOtpForgetPasswordApi.error) {
      toast.error(
        `${verifyOtpForgetPasswordApi.responseProblem} ${verifyOtpForgetPasswordApi.errorStatus}`,
        `${verifyOtpForgetPasswordApi.error}`
      );
      return;
    }
  }, [verifyOtpForgetPasswordApi.data, verifyOtpForgetPasswordApi.error]);

  const handleNewOtpRequest = async () => {
    if (email) {
      requestPasswordResetApi.request(email);
      toast.success(
        `Request Sent`,
        requestPasswordResetApi.data?.message || "OTP sent successfully"
      );
    } else {
      toast.error("Error", "Email address not found");
    }
  };

  // useEffect to handle request new otp response
  useEffect(() => {
    if (requestPasswordResetApi.data) {
      toast.success(`Success`, `Email has been sent to ${email}`);

      return;
    }
    if (requestPasswordResetApi.error) {
      toast.error(
        `${requestPasswordResetApi.responseProblem} ${requestPasswordResetApi.errorStatus}`,
        `${requestPasswordResetApi.error}`
      );

      return;
    }
  }, [requestPasswordResetApi.data, requestPasswordResetApi.error]);

  return (
    <View style={styles.container}>
      <NetworkStatusBadge />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ position: "absolute", top: 20, left: 20 }}
      >
        <FontAwesome
          name="chevron-left"
          size={PERCENT[10]}
          color={COLORS.tertiary}
        />
      </TouchableOpacity>

      <Text mb={"$1"} mt={"$20"} size="lg" bold textAlign="center">
        Enter the 6-digit OTP sent to your registered email address.
      </Text>
      <Text mb={"$2"} mx={"$10"} color="gray" textAlign="center" size="xs">
        If you don't receive the OTP, please check your spam folder.
      </Text>
      <Text bold size="md" mb={"$2"}>
        OR
      </Text>
      <Input variant="outline" size="lg" mt={"$1"}>
        <InputField
          size="md"
          placeholder="Your Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          required
        />
        <InputSlot mr={"$3"}>
          <FontAwesome name="envelope" size={24} color={COLORS.tertiary} />
        </InputSlot>
      </Input>
      <TouchableOpacity
        disabled={
          requestPasswordResetApi.loading || verifyOtpForgetPasswordApi.loading
        }
        onPress={handleNewOtpRequest}
      >
        <Text bold size="lg" color={COLORS.activeText} mb={"$10"}>
          Request OTP
        </Text>
      </TouchableOpacity>

      <Text style={styles.title}>Enter OTP</Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.input}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="numeric"
            maxLength={1}
            ref={(el) => (inputRefs.current[index] = el)}
          />
        ))}
      </View>

      <Button
        isDisabled={
          otp.join("").length !== 6 ||
          verifyOtpForgetPasswordApi.loading ||
          requestPasswordResetApi.loading
        }
        mt={"$10"}
        onPress={() => verifyOtp(otp.join(""))}
      >
        <ButtonText>Verify OTP</ButtonText>
      </Button>

      <Text textAlign="center" mt={"$16"}>
        Thank you for choosing us.{"\n"}
        Stay safe and enjoy your fuel purchase Experience
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: HEIGHT,
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: COLORS.primary,
    paddingBottom: 150,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  input: {
    color: COLORS.activeText,
    borderBottomWidth: 2,
    borderColor: "#000",
    width: "13%",
    textAlign: "center",
    fontSize: 24,
    borderWidth: 1,
  },
});

export default RequestOTP;

import { Button, ButtonText, Text } from "@gluestack-ui/themed";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { COLORS, HEIGHT, PERCENT } from "../../../Constants/Constants";
import useAuth from "../../../auth/useAuth";
import { FontAwesome } from "@expo/vector-icons";

import useApi from "../../../hooks/useApi";
import authApis from "../../../api/auth";
import { NetworkStatusBadge } from "../../../components/NetworkStatusBadge";

interface OTPScreenProps {
  navigation: any;
}

const VerifyAccount: React.FC<OTPScreenProps> = ({ navigation }) => {
  const auth = useAuth();

  const verifyOtpApi = useApi(authApis.verifyOtp);

  const refreshOtpApi = useApi(authApis.requestNewOtp);

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
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
    verifyOtpApi.request(enteredOtp);
  };

  // useEffect to handle verify Otp response
  useEffect(() => {
    if (verifyOtpApi.data) {
      Alert.alert(
        `Success`,
        `${verifyOtpApi.data.message} for ${verifyOtpApi.data.employee.name}`
      );
      navigation.goBack();

      auth.login(verifyOtpApi.data.token);
      return;
    }
    if (verifyOtpApi.error) {
      Alert.alert(
        `${verifyOtpApi.responseProblem} ${verifyOtpApi.errorStatus}`,
        `${verifyOtpApi.error}`
      );
      return;
    }
  }, [verifyOtpApi.data, verifyOtpApi.error]);

  const handleNewOtpRequest = async () => {
    refreshOtpApi.request();
  };

  // useEffect to handle request new otp response
  useEffect(() => {
    if (refreshOtpApi.data) {
      Alert.alert(`Success`, `${refreshOtpApi.data.message}`);

      return;
    }
    if (refreshOtpApi.error) {
      Alert.alert(
        `${refreshOtpApi.responseProblem} ${refreshOtpApi.errorStatus}`,
        `${refreshOtpApi.error}`
      );
      return;
    }
  }, [refreshOtpApi.data, refreshOtpApi.error]);

  return (
    <View style={styles.container}>
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
      <NetworkStatusBadge />

      <Text mb={"$1"} mt={"$20"} size="lg" bold textAlign="center">
        Enter the 6-digit OTP sent to your registered email address.
      </Text>
      <Text mb={"$2"} mx={"$10"} color="gray" textAlign="center" size="xs">
        If you don't receive the OTP, please check your spam folder.
      </Text>
      <Text bold size="md" mb={"$2"}>
        OR
      </Text>
      <TouchableOpacity
        disabled={refreshOtpApi.loading || verifyOtpApi.loading}
        onPress={() => handleNewOtpRequest()}
      >
        <Text bold size="lg" color={COLORS.activeText} mb={"$10"}>
          Request Another OTP
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
          verifyOtpApi.loading ||
          refreshOtpApi.loading
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

export default VerifyAccount;

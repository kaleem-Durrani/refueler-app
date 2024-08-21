import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  Button,
  ButtonText,
  Text,
  Input,
  InputField,
  InputSlot,
} from "@gluestack-ui/themed";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS, HEIGHT } from "../../../Constants/Constants";
import useApi from "../../../hooks/useApi";
import MyToast from "../../../components/MyToast";
import authApis from "../../../api/auth";
import { useRoute } from "@react-navigation/native";

const ForgetPassword: React.FC = ({ navigation }: any) => {
  const route = useRoute();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const resetPasswordApi = useApi(authApis.resetPassword);
  const toast = MyToast();

  useEffect(() => {
    if (route.params) {
      setEmail(route.params.email);
      setOtp(route.params.otp);
    } else {
      toast.error("Error", "Email address not found");
      navigation.navigate("Login");
    }
  }, [route.params]);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Error", "Passwords do not match");
      return;
    }
    await resetPasswordApi.request(email, newPassword, otp);
  };

  useEffect(() => {
    if (resetPasswordApi.data) {
      toast.success(`Success`, `${resetPasswordApi.data.message}`);
      navigation.navigate("Login");
    }
    if (resetPasswordApi.error) {
      toast.error(`Error`, `${resetPasswordApi.error}`);
    }
  }, [resetPasswordApi.data, resetPasswordApi.error]);

  return (
    <View style={styles.container}>
      <Text size="xl" bold mb="$4" color={COLORS.primary}>
        Change Password
      </Text>

      <Input variant="outline" size="lg" mb="$4">
        <InputField
          placeholder="Email"
          value={email}
          editable={false}
          keyboardType="email-address"
          color={COLORS.primary}
        />
        <InputSlot mr="$3">
          <FontAwesome name="envelope" size={24} color={COLORS.tertiary} />
        </InputSlot>
      </Input>

      <Input variant="outline" size="lg" mb="$4">
        <InputField
          placeholder="New Password"
          placeholderTextColor={COLORS.primary}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={!showNewPassword}
          color={COLORS.primary}
        />

        <InputSlot mr="$3" onPress={() => setShowNewPassword(!showNewPassword)}>
          <FontAwesome
            name={showNewPassword ? "eye" : "eye-slash"}
            size={24}
            color={COLORS.primary}
          />
        </InputSlot>
      </Input>

      <Input variant="outline" size="lg" mb="$6">
        <InputField
          placeholder="Confirm New Password"
          placeholderTextColor={COLORS.primary}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          color={COLORS.primary}
        />

        <InputSlot
          mr="$3"
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <FontAwesome
            name={showConfirmPassword ? "eye" : "eye-slash"}
            size={24}
            color={COLORS.primary}
          />
        </InputSlot>
      </Input>

      <Button
        onPress={handleChangePassword}
        variant="solid"
        bg={COLORS.primary}
        isDisabled={resetPasswordApi.loading}
      >
        <ButtonText color={COLORS.tertiary}>Change Password</ButtonText>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: HEIGHT,
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: COLORS.tertiary,
    color: COLORS.primary,
  },
});

export default ForgetPassword;

import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import {
  VStack,
  SafeAreaView,
  Text,
  View,
  Input,
  InputSlot,
  InputField,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { PERCENT } from "../../../Constants/Constants";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../../Constants/Constants";
import employeeApis from "../../../api/employee";
import { NetworkStatusBadge } from "../../../components/NetworkStatusBadge";
import useApi from "../../../hooks/useApi";

export default function PasswordChange({ navigation }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const changePasswordApi = useApi(employeeApis.changePassword);

  const handleChangePassword = async () => {
    if (
      currentPassword.trim() === "" ||
      newPassword.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      Alert.alert("Invalid Inputs", "Please fill in all fields");
      return;
    }

    // make sure the legnth of all fields is at least 6 characters after trimming
    if (
      currentPassword.trim().length < 6 ||
      newPassword.trim().length < 6 ||
      confirmPassword.trim().length < 6
    ) {
      Alert.alert(
        "Invalid Inputs",
        "Passwords must be at least 6 characters long"
      );
      return;
    }

    // make sure new password and confirm password match

    if (newPassword.trim() !== confirmPassword.trim()) {
      Alert.alert("Invalid Inputs", "Passwords do not match");
      return;
    }

    setLoading(true);
    changePasswordApi.request(currentPassword, newPassword, confirmPassword);
    setLoading(false);
  };

  useEffect(() => {
    if (changePasswordApi.data) {
      Alert.alert("Success", `${changePasswordApi.data.message}`);
      return navigation.goBack();
    }

    if (changePasswordApi.error) {
      Alert.alert(
        `${changePasswordApi.responseProblem} ${changePasswordApi.errorStatus}`,
        `${changePasswordApi.error}`
      );
    }
  }, [changePasswordApi.data, changePasswordApi.error]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <NetworkStatusBadge />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back-ios" size={PERCENT[9]} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>Change Password</Text>
      <VStack style={styles.container}>
        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Current Password</Text>
          <Input variant="rounded" size="lg">
            <InputSlot ml={"$1"}>
              <MaterialIcons
                name="password"
                size={24}
                color={COLORS.tertiary}
              />
            </InputSlot>
            <InputField
              type={showPassword ? "text" : "password"}
              placeholder="Current Password"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              style={styles.inputField}
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
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>New Password</Text>
          <Input variant="rounded" size="lg">
            <InputSlot ml={"$1"}>
              <MaterialIcons
                name="password"
                size={24}
                color={COLORS.tertiary}
              />
            </InputSlot>
            <InputField
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              style={styles.inputField}
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
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Confirm New Password</Text>
          <Input variant="rounded" size="lg">
            <InputSlot ml={"$1"}>
              <MaterialIcons
                name="password"
                size={24}
                color={COLORS.tertiary}
              />
            </InputSlot>
            <InputField
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.inputField}
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
        </View>

        <Button
          mt={"$4"}
          w={"$full"}
          style={styles.changeButton}
          onPress={handleChangePassword}
          isDisabled={changePasswordApi.loading}
        >
          <ButtonText style={styles.buttonText}>Change Password</ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.tertiary,
    padding: PERCENT[6],
  },
  container: {
    padding: PERCENT[6],
    backgroundColor: COLORS.primary,
    marginTop: PERCENT[6],
    borderRadius: PERCENT[6],
    elevation: 10,
  },
  backButton: {
    position: "absolute",
    top: PERCENT[4],
    left: PERCENT[4],
    padding: "2%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: "20%",
    alignSelf: "center",
    color: "white",
    fontSize: PERCENT[10],
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 3,
  },
  formGroup: {
    marginBottom: PERCENT[4],
  },
  inputLabel: {
    fontSize: PERCENT[4],
    fontWeight: "bold",
    color: COLORS.tertiary,
    marginBottom: "2%",
  },
  inputField: {
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: "2%",
    fontSize: PERCENT[4],
  },
  changeButton: {
    backgroundColor: COLORS.tertiary,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: PERCENT[5],
    color: COLORS.primary,
    fontWeight: "bold",
  },
});

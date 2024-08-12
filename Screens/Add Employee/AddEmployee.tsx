import {
  View,
  Text,
  Input,
  InputField,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import { COLORS, PERCENT } from "../../Constants/Constants";
import { MaterialIcons } from "@expo/vector-icons";
import employeeApis from "../../api/employee";
import useApi from "../../hooks/useApi";

const AddEmployee = ({ navigation }: any) => {
  const [email, setEmail] = useState("");

  const addEmployeeApi = useApi(employeeApis.addEmployeeToPump);

  const handleAddEmployee = async () => {
    if (email.trim() === "") {
      alert("Please enter an email");
      return;
    }

    // validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    await addEmployeeApi.request(email);
  };

  useEffect(() => {
    if (addEmployeeApi.data) {
      Alert.alert("Success", `${addEmployeeApi.data.message}`);
      navigation.goBack();
      return;
    }

    if (addEmployeeApi.error) {
      Alert.alert(
        `${addEmployeeApi.responseProblem} ${addEmployeeApi.errorStatus}`,
        `${addEmployeeApi.error}`
      );
      setEmail("");
      return;
    }
  }, [addEmployeeApi.data, addEmployeeApi.error]);

  return (
    <View px={"$6"}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons
          name="arrow-back-ios"
          size={PERCENT[9]}
          color={COLORS.tertiary}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Add Employee</Text>

      <Text fontWeight="bold" color={COLORS.activeText} mt={"$6"}>
        Email
      </Text>
      <Input
        isDisabled={addEmployeeApi.loading}
        variant="outline"
        size="lg"
        mt={"$1"}
      >
        <InputField
          inputMode="email"
          size="md"
          placeholder="Enter your employees email"
          value={email}
          onChangeText={setEmail}
        />
      </Input>

      <Button
        isDisabled={addEmployeeApi.loading}
        onPress={() => handleAddEmployee()}
        variant="outline"
        mt={"$8"}
      >
        <ButtonText>Add Employee</ButtonText>
      </Button>
    </View>
  );
};

export default AddEmployee;

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: PERCENT[4],
    left: PERCENT[3],
    padding: "2%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
  },
  title: {
    marginTop: "20%",
    alignSelf: "center",
    color: COLORS.tertiary,
    fontSize: PERCENT[10],
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 3,
  },
});

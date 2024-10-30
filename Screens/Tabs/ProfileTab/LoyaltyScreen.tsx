import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { COLORS, PERCENT } from "../../../Constants/Constants";
import { NetworkStatusBadge } from "../../../components/NetworkStatusBadge";
import employeeApis from "../../../api/employee";
import useApi from "../../../hooks/useApi";

import useProfile from "../../../hooks/useProfile";

export default function LoyaltyScreen() {
  const { profile, fetchProfile } = useProfile();
  const [threshold, setThreshold] = useState(null);
  const setThresholdApi = useApi(employeeApis.updateLoyaltyProgram);
  const handleSave = async () => {
    if (!threshold) {
      Alert.alert("Invalid Input", "Please fill in all the field.");
      return;
    }

    await setThresholdApi.request(threshold, profile.pumpId);
  };

  useEffect(() => {
    if (setThresholdApi.data) {
      Alert.alert("Success", setThresholdApi.data.message);
      return;
    }
    if (setThresholdApi.error) {
      Alert.alert("Error", setThresholdApi.error);
      return;
    }
  }, [setThresholdApi.data, setThresholdApi.error]);

  return (
    <SafeAreaView style={styles.container}>
      <NetworkStatusBadge />
      <Text style={styles.title}>Loyalty Program</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Threshold</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter threshold amount per point"
          keyboardType="numeric"
          value={threshold}
          onChangeText={setThreshold}
        />
        <Text style={{ color: COLORS.primary, fontSize: PERCENT[4] }}>
          Enter the amount on which 1 loyalty point will be awarded.
        </Text>
      </View>
      <Button title="Save" onPress={handleSave} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.tertiary,
    padding: PERCENT[6],
  },
  title: {
    fontSize: PERCENT[10],
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: PERCENT[6],
  },
  formGroup: {
    marginBottom: PERCENT[4],
  },
  label: {
    fontSize: PERCENT[4],
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: PERCENT[2],
  },
  input: {
    backgroundColor: "white",
    borderRadius: PERCENT[2],
    padding: PERCENT[3],
    fontSize: PERCENT[4],
  },
});

import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  VStack,
  Input,
  InputSlot,
  InputField,
  Button,
  ButtonText,
  HStack,
  Text,
} from "@gluestack-ui/themed";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../../../Contexts/AuthContext";
import { PERCENT, COLORS } from "../../../Constants/Constants";

export default function PersonalDetail({ navigation }: any) {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <HStack justifyContent="center" alignItems="center">
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Personal Details</Text>
      </HStack>
      <VStack style={styles.formContainer}>
        <Text style={styles.label}>Name</Text>
        <Input variant="rounded" size="lg" mb={"$6"}>
          <InputSlot ml={"$3"}>
            <MaterialIcons name="person" size={24} color={COLORS.tertiary} />
          </InputSlot>
          <InputField value={user.name} placeholder="Enter Name" />
        </Input>

        <Text style={styles.label}>Email</Text>
        <Input variant="rounded" size="lg" mb={"$6"}>
          <InputSlot ml={"$3"}>
            <MaterialIcons name="email" size={24} color={COLORS.tertiary} />
          </InputSlot>
          <InputField value={user.email} placeholder="Enter Email" />
        </Input>

        <Text style={styles.label}>Phone Number</Text>
        <Input variant="rounded" size="lg">
          <InputSlot ml={"$3"}>
            <MaterialIcons name="phone" size={24} color={COLORS.tertiary} />
          </InputSlot>
          <InputField value={user.phone} placeholder="Enter Phone Number" />
        </Input>

        <Button
          bg={COLORS.tertiary}
          mt={"$4"}
          w={"$full"}
          borderRadius={10}
          onPress={() => alert("Details updated successfully")}
        >
          <ButtonText>Update Details</ButtonText>
        </Button>
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.tertiary,
    padding: "6%",
  },
  backButton: {
    position: "absolute",
    top: PERCENT[6],
    left: PERCENT[2],
    padding: "2%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
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
  formContainer: {
    backgroundColor: "white",
    borderRadius: PERCENT[6],
    padding: PERCENT[6],
    elevation: 10,
    marginTop: "10%",
  },
  label: {
    color: COLORS.activeText,
    fontSize: PERCENT[4],
    alignSelf: "flex-start",
    marginLeft: PERCENT[2],
    fontWeight: "bold",
    marginBottom: PERCENT[1],
  },
});

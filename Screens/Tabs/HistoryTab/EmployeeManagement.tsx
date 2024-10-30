import {
  View,
  Text,
  ScrollView,
  ButtonText,
  Button,
  Divider,
  HStack,
  Center,
} from "@gluestack-ui/themed";
import React, { useEffect } from "react";
import EmployeeSwitch from "./components/EmployeeSwitch";
import useFetchEmployeeList from "../../../hooks/useFetchEmployeeList";
import { NetworkStatusBadge } from "../../../components/NetworkStatusBadge";

export default function EmployeeManagement({ navigation }: any) {
  const {
    loading,
    isError,
    error,
    errorStatus,
    errorProblem,
    employeesList,
    fetchEmployeeList,
    refreshEmployeeList,
  } = useFetchEmployeeList();

  // useEffect(() => {
  //   if (!employeesList) {
  //     fetchEmployeeList();
  //   }
  // }, []);

  // if (loading) {
  //   return <Text>Loading...</Text>;
  // }

  // if (isError) {
  //   return (
  //     <View>
  //       <Text>
  //         Error: {errorProblem} - {errorStatus} {"\n"}
  //         {error}
  //       </Text>
  //     </View>
  //   );
  // }

  return (
    <View>
      <NetworkStatusBadge />
      <HStack justifyContent="space-between">
        <Button
          isDisabled={loading}
          onPress={() => refreshEmployeeList()}
          variant="outline"
          mt={"$3"}
          ml={"$4"}
        >
          <ButtonText>Refresh List</ButtonText>
        </Button>

        <Button
          isDisabled={loading}
          onPress={() => navigation.navigate("AddEmployee")}
          variant="outline"
          mt={"$3"}
          mr={"$4"}
        >
          <ButtonText> Add an Employee</ButtonText>
        </Button>
      </HStack>

      <Divider mt={"$3"} />

      {loading ? (
        <Center minHeight={"$5/6"}>
          <Text size="xl">Loading...</Text>
        </Center>
      ) : isError ? (
        <Center minHeight={"$5/6"}>
          <Text size="xl">
            Error: {errorProblem} - {errorStatus} {"\n"}
            {error}
          </Text>
        </Center>
      ) : (
        <ScrollView mt={"$3"} showsVerticalScrollIndicator={false}>
          {/* map over the employeeList pass name and createdAt to the Employee switch */}
          {employeesList &&
            employeesList.map((employee) => (
              <EmployeeSwitch
                key={employee._id}
                name={employee.name}
                createdAt={employee.createdAt}
                email={employee.email}
                phoneNumber={employee.phoneNumber}
                imageUrl={employee.imageUrl}
                pumpId={employee.pumpId}
              />
            ))}
        </ScrollView>
      )}
    </View>
  );
}

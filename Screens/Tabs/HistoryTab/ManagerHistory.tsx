import {
  View,
  Text,
  VStack,
  ScrollView,
  Divider,
  Select,
  SelectInput,
  SelectTrigger,
  SelectIcon,
  SelectBackdrop,
  SelectContent,
  Icon,
  ChevronDownIcon,
  SelectPortal,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
  ButtonText,
  Button,
  HStack,
  Center,
} from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import HistoryCard from "./components/HistoryCard";
import FilterText from "./components/FilterText";
import { PERCENT, COLORS } from "../../../Constants/Constants";
import useFetchEmployeeList from "../../../hooks/useFetchEmployeeList";
import employeeApis from "../../../api/employee";
import useApi from "../../../hooks/useApi";
import { Alert } from "react-native";
import { format } from "date-fns";

export default function ManagerHistory() {
  // const [filter, setFilter] = useState("Today");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [employeeHistory, setEmployeeHistory] = useState(null);

  const employeeHistoryApi = useApi(employeeApis.getEmployeeTransactionHistory);

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

  useEffect(() => {
    if (!employeesList) {
      fetchEmployeeList();
    }
  }, []);

  useEffect(() => {
    if (selectedEmployee) {
      employeeHistoryApi.request(selectedEmployee);
    }
  }, [selectedEmployee]);

  useEffect(() => {
    if (employeeHistoryApi.data) {
      Alert.alert("Success", `${employeeHistoryApi.data.message}`);
      setEmployeeHistory(employeeHistoryApi.data.transactions);
      return;
    }

    if (employeeHistoryApi.error) {
      Alert.alert(
        `${employeeHistoryApi.responseProblem} ${employeeHistoryApi.errorStatus}`,
        `${employeeHistoryApi.error}`
      );
      return;
    }
  }, [employeeHistoryApi.data, employeeHistoryApi.error]);

  return (
    <VStack flex={1} px={"$0"}>
      <HStack p={"$3"} justifyContent="space-between">
        <Button
          isDisabled={loading || employeeHistoryApi.loading}
          variant="outline"
          onPress={() => {
            refreshEmployeeList();
          }}
        >
          <ButtonText>Refresh List</ButtonText>
        </Button>

        <Button
          isDisabled={
            loading || employeeHistoryApi.loading || !selectedEmployee
          }
          variant="outline"
          onPress={() => employeeHistoryApi.request(selectedEmployee)}
        >
          <ButtonText>Refresh History </ButtonText>
        </Button>
      </HStack>
      <View flexDirection="row" alignItems="center" justifyContent="center">
        <Select
          flex={2}
          mx={"$16"}
          my={"$3"}
          onValueChange={setSelectedEmployee}
        >
          <SelectTrigger variant="rounded" size="md">
            <SelectInput placeholder="Select Employee" />
            <SelectIcon mr={"$3"}>
              <Icon as={ChevronDownIcon} />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <ScrollView px={"$10"} showsVerticalScrollIndicator={false}>
                {employeesList &&
                  employeesList.map((employee) => (
                    <SelectItem
                      key={employee.id}
                      label={employee.name}
                      value={employee._id}
                    />
                  ))}
              </ScrollView>
            </SelectContent>
          </SelectPortal>
        </Select>
      </View>

      {!selectedEmployee ? (
        <Center flex={1}>
          <Text>No Employee Selected</Text>
        </Center>
      ) : employeeHistoryApi.loading ? (
        <Center flex={1}>
          <Text>Loading this employee's transactions...</Text>
        </Center>
      ) : employeeHistoryApi.error ? (
        <Center flex={1}>
          <Text>{employeeHistoryApi.error.toString()}</Text>
        </Center>
      ) : (
        <>
          <Divider mt={"$2"} />
          <VStack flex={8} px={"$3"} py={"$2"}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {employeeHistory &&
                employeeHistory.map((transaction) => (
                  <HistoryCard
                    key={transaction._id}
                    paymentBy={transaction.paymentMethod}
                    name={transaction.customerId.name}
                    date={format(new Date(transaction.createdAt), "PPP")}
                    amount={transaction.amount}
                    fuelType={transaction.fuelType}
                    fuelAmount={transaction.fuelAmount}
                    paymentMethod={transaction.paymentMethod}
                  />
                ))}
            </ScrollView>
          </VStack>
        </>
      )}
    </VStack>
  );
}

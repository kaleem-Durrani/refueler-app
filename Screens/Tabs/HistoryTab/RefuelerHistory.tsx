import {
  View,
  Image,
  VStack,
  ScrollView,
  Divider,
  Text,
  Spinner,
  ButtonText,
  Button,
} from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import HistoryCard from "./components/HistoryCard";
import FilterText from "./components/FilterText";
import useRefuelerTransactionHistory from "../../../hooks/useRefuelerTransactionHistory";
import { format } from "date-fns";
import { COLORS } from "../../../Constants/Constants";

export default function RefuelerHistory() {
  const [filter, setFilter] = useState("Today");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const {
    fetchTransactionHistory,
    refuelerTransactions,
    loading,
    isError,
    error,
    errorStatus,
    errorProblem,
  } = useRefuelerTransactionHistory();

  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  useEffect(() => {
    if (refuelerTransactions) {
      filterTransactions(refuelerTransactions, filter);
    }

    if (isError) {
      console.log("Error:", error);
      console.log("Error Status:", errorStatus);
      console.log("Error Problem:", errorProblem);
    }
  }, [refuelerTransactions, isError, filter]);

  const filterTransactions = (transactions, filter) => {
    const now = new Date();
    let filtered = [];

    switch (filter) {
      case "Today":
        filtered = transactions.filter((transaction) => {
          const date = new Date(transaction.createdAt);
          return (
            date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
          );
        });
        break;
      case "This Week":
        const startOfWeek = now.getDate() - now.getDay();
        const endOfWeek = startOfWeek + 6;
        filtered = transactions.filter((transaction) => {
          const date = new Date(transaction.createdAt);
          return (
            date.getDate() >= startOfWeek &&
            date.getDate() <= endOfWeek &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
          );
        });
        break;
      case "This Month":
        filtered = transactions.filter((transaction) => {
          const date = new Date(transaction.createdAt);
          return (
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
          );
        });
        break;
      case "3 Months":
        const threeMonthsAgo = new Date(now.setMonth(now.getMonth() - 3));
        filtered = transactions.filter((transaction) => {
          const date = new Date(transaction.createdAt);
          return date >= threeMonthsAgo;
        });
        break;
      case "6 Months":
        const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6));
        filtered = transactions.filter((transaction) => {
          const date = new Date(transaction.createdAt);
          return date >= sixMonthsAgo;
        });
        break;
      case "This Year":
        filtered = transactions.filter((transaction) => {
          const date = new Date(transaction.createdAt);
          return date.getFullYear() === now.getFullYear();
        });
        break;
      case "2 Years":
        const twoYearsAgo = new Date(now.setFullYear(now.getFullYear() - 2));
        filtered = transactions.filter((transaction) => {
          const date = new Date(transaction.createdAt);
          return date >= twoYearsAgo;
        });
        break;
      case "All time":
      default:
        filtered = transactions;
        break;
    }

    setFilteredTransactions(filtered);
  };

  // if (loading) {
  //   return (
  //     <View
  //       flexDirection="row"
  //       display="flex"
  //       justifyContent="center"
  //       alignItems="center"
  //       flex={1}
  //     >
  //       <Spinner size={"large"} />
  //       <Text size={"xl"} fontWeight={"bold"}>
  //         {"Loading..."}
  //       </Text>
  //     </View>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <View display="flex" justifyContent="center" alignItems="center" flex={1}>
  //       <Text size={"xl"} fontWeight={"bold"}>
  //         {"Error"}
  //       </Text>
  //       <Text textAlign="center" mt={"$2"}>
  //         {errorStatus} - {errorProblem} {"\n"}
  //         {error}
  //       </Text>
  //     </View>
  //   );
  // }

  return (
    <VStack flex={1} px={"$0"}>
      <Button
        onPress={() => fetchTransactionHistory()}
        m={"$3"}
        isDisabled={loading}
        variant="outline"
        alignSelf="flex-start"
      >
        <ButtonText>Refresh History</ButtonText>
      </Button>

      <Divider />

      {loading ? (
        <View
          flexDirection="row"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flex={1}
        >
          <Spinner size={"large"} />
          <Text size={"xl"} fontWeight={"bold"}>
            {"Loading..."}
          </Text>
        </View>
      ) : isError ? (
        <View
          display="flex"
          justifyContent="center"
          alignItems="center"
          flex={1}
        >
          <Text size={"xl"} fontWeight={"bold"}>
            {"Error"}
          </Text>
          <Text textAlign="center" mt={"$2"}>
            {errorStatus} - {errorProblem} {"\n"}
            {error}
          </Text>
        </View>
      ) : (
        <>
          <View flex={1} mx={"$3"} bg={"white"} my={"$2"} borderRadius={10}>
            <ScrollView
              borderRadius={10}
              contentContainerStyle={{ alignItems: "center" }}
              horizontal
              showsHorizontalScrollIndicator={false}
              flex={1}
            >
              <FilterText
                onPress={() => setFilter("Today")}
                filter={filter}
                text={"Today"}
              />
              <FilterText
                onPress={() => setFilter("This Week")}
                filter={filter}
                text={"This Week"}
              />
              <FilterText
                onPress={() => setFilter("This Month")}
                filter={filter}
                text={"This Month"}
              />
              <FilterText
                onPress={() => setFilter("3 Months")}
                filter={filter}
                text={"3 Months"}
              />
              <FilterText
                onPress={() => setFilter("6 Months")}
                filter={filter}
                text={"6 Months"}
              />
              <FilterText
                onPress={() => setFilter("This Year")}
                filter={filter}
                text={"This Year"}
              />
              <FilterText
                onPress={() => setFilter("2 Years")}
                filter={filter}
                text={"2 Years"}
              />
              <FilterText
                onPress={() => setFilter("All time")}
                filter={filter}
                text={"All time"}
              />
            </ScrollView>
          </View>

          <Divider />

          <VStack flex={8} px={"$3"} py={"$2"}>
            {filteredTransactions.length === 0 ? (
              <View
                display="flex"
                justifyContent="center"
                alignItems="center"
                flex={1}
              >
                <Text size={"xl"} fontWeight={"bold"}>
                  {"No transactions done:"} {filter}
                </Text>
              </View>
            ) : null}

            <ScrollView showsVerticalScrollIndicator={false}>
              {filteredTransactions.map((transaction) => (
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

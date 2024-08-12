import { useEffect, useState } from "react";
import useApi from "./useApi";
import employeeApis from "../api/employee";
import { Alert } from "react-native";

export default useRefuelerTransactionHistory = () => {
  const [refuelerTransactions, setRefuelerTransactions] = useState(null);

  const transactionHistoryApi = useApi(
    employeeApis.getRefuelerTransactionHistory
  );

  const fetchTransactionHistory = async () => {
    setRefuelerTransactions(null);
    await transactionHistoryApi.request();
  };

  useEffect(() => {
    if (transactionHistoryApi.data) {
      Alert.alert(
        "Loaded successfully",
        `${transactionHistoryApi.data.message}`
      );

      setRefuelerTransactions(transactionHistoryApi.data.transactions);

      return;
    }

    if (transactionHistoryApi.error) {
      Alert.alert(
        `${transactionHistoryApi.responseProblem} ${transactionHistoryApi.errorStatus}`,
        `${transactionHistoryApi.error}`
      );

      return;
    }
  }, [transactionHistoryApi.data, transactionHistoryApi.error]);

  const refreshTransactionHistory = async () => {
    await fetchTransactionHistory();
  };

  return {
    loading: transactionHistoryApi.loading,
    error: transactionHistoryApi.error,
    isError: transactionHistoryApi.isError,
    errorStatus: transactionHistoryApi.errorStatus,
    errorProblem: transactionHistoryApi.responseProblem,
    refuelerTransactions,
    fetchTransactionHistory,
    refreshTransactionHistory,
  };
};

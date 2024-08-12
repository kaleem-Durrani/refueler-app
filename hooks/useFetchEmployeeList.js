import { useEffect, useContext } from "react";
import useApi from "./useApi";
import employeeApis from "../api/employee";
import { Alert } from "react-native";
import EmployeeListContext from "../Contexts/EmployeeListContext";

export default useFetchEmployeesList = () => {
  const { employeesList, setEmployeesList } = useContext(EmployeeListContext);

  const fetchEmployeeApi = useApi(employeeApis.getEmployeesList);

  const fetchEmployeeList = async () => {
    setEmployeesList(null);
    await fetchEmployeeApi.request();
  };

  useEffect(() => {
    if (fetchEmployeeApi.data) {
      Alert.alert("Success", `${fetchEmployeeApi.data.message}`);
      setEmployeesList(fetchEmployeeApi.data.employees);
      return;
    }

    if (fetchEmployeeApi.error) {
      Alert.alert(
        `${fetchEmployeeApi.responseProblem} ${fetchEmployeeApi.errorStatus}`,
        `${fetchEmployeeApi.error}`
      );

      return;
    }
  }, [fetchEmployeeApi.data, fetchEmployeeApi.error]);

  const refreshEmployeeList = async () => {
    await fetchEmployeeList();
  };

  return {
    loading: fetchEmployeeApi.loading,
    error: fetchEmployeeApi.error,
    isError: fetchEmployeeApi.isError,
    errorStatus: fetchEmployeeApi.errorStatus,
    errorProblem: fetchEmployeeApi.responseProblem,
    employeesList,
    fetchEmployeeList,
    refreshEmployeeList,
  };
};

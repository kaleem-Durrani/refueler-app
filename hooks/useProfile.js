import { useContext, useEffect } from "react";
import ProfileContext from "../Contexts/ProfileContext";
import employeeApis from "../api/employee";
import useApi from "./useApi";

export default useProfile = () => {
  const { profile, setProfile } = useContext(ProfileContext);

  const getProfileApi = useApi(employeeApis.getProfile);

  const fetchProfile = async () => {
    setProfile(null);
    await getProfileApi.request();
  };

  useEffect(() => {
    if (getProfileApi.data) {
      setProfile(getProfileApi.data.employee);
    }
  }, [getProfileApi.data]);

  const refreshProfile = async () => {
    await fetchProfile();
  };

  return { profile, setProfile, fetchProfile, refreshProfile };
};

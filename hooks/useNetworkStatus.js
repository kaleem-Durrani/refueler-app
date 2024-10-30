// useNetworkStatus.js
import { useContext } from "react";
import { NetworkContext } from "../Contexts/NetworkContext";

export const useNetworkStatus = () => {
  return useContext(NetworkContext);
};

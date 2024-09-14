// NetworkContext.js
import React, { createContext, useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

export const NetworkContext = createContext();

export const NetworkProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  return (
    <NetworkContext.Provider value={isConnected}>
      {children}
    </NetworkContext.Provider>
  );
};

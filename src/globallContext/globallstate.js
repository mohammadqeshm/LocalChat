"use client";
import React, { createContext, useContext, useState, useMemo } from "react";

const GlobalStateContext = createContext(null);

export function GlobalStateProvider({ children }) {
  // UI state used across the app
  const [hidecon, setHidecon] = useState(false);
  const [status, setStatus] = useState("1");
  const [volumeOn, setVolumeOn] = useState(true);

  const value = useMemo(
    () => ({ hidecon, setHidecon, status, setStatus, volumeOn, setVolumeOn }),
    [hidecon, status, volumeOn]
  );

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  const ctx = useContext(GlobalStateContext);
  if (!ctx)
    throw new Error("useGlobalState must be used within GlobalStateProvider");
  return ctx;
}

export default GlobalStateProvider;

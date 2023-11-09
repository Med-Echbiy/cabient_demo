"use client";
import React, { useEffect, useState } from "react";
interface props {
  children: React.ReactNode;
}

function ClientWrapper({ children }: props) {
  const [client, setClient] = useState(false);
  useEffect(() => {
    if (window) {
      setClient(true);
    }
  }, [client]);
  if (!client) {
    return <></>;
  }
  return <>{children}</>;
}

export default ClientWrapper;

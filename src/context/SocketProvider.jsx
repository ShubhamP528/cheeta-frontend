import React, { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client";
import { SOCKET_API_ENDPOINT } from "../utils/utils";

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export const SocketProvider = (props) => {
  const socket = useMemo(() => io(SOCKET_API_ENDPOINT), []);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};

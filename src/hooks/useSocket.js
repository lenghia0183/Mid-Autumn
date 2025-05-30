// hooks/useSocket.js
import { useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";
import { getLocalStorageItem } from "../utils";

const API_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

export const useSocket = (token) => {
  const socketRef = useRef(null);

  useEffect(() => {
    // Disconnect existing socket if any
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    if (!token) return;

    const user = getLocalStorageItem("user");
    const socket = io(API_URL, {
      auth: { token },
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected with token:", token);
      socket.emit("chat:join", { userId: user?._id });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      socket.emit("chat:leave", { userId: user?._id });
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  const emit = useCallback((event, data) => {
    socketRef.current?.emit(event, data);
  }, []);

  const on = useCallback((event, callback) => {
    socketRef.current?.on(event, callback);
  }, []);

  const off = useCallback((event, callback) => {
    socketRef.current?.off(event, callback);
  }, []);

  return {
    socket: socketRef.current,
    emit,
    on,
    off,
  };
};

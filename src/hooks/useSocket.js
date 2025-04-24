// hooks/useSocket.js
import { useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

export const useSocket = (token) => {
  const socketRef = useRef(null);
  console.log("token", token);
  useEffect(() => {
    if (!token) return;

    const socket = io(API_URL, {
      auth: { token },
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
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

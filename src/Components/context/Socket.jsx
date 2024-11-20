import { io } from "socket.io-client";

const socket = io("http://127.0.0.1:5555", {
  transports: ["websocket"],
  reconnectionAttempts: 3,
});

socket.on("connect", () => console.log("WebSocket connected"));
socket.on("disconnect", () => console.log("WebSocket disconnected"));

export default socket;

// lib/socket.js
import {io} from "socket.io-client";

const socket = io(`http://${process.env.NEXT_PUBLIC_DSB_BACKEND_HOST}:5174`); // backend socket server

export default socket;

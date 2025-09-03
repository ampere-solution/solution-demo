// lib/socket.js
import {io} from "socket.io-client";

const socket = io(`http://${process.env.DSB_BACKEND_HOST}:5174`); // backend socket server

export default socket;

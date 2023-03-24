import {io} from "socket.io-client";

const URL = "http://192.168.1.41:5000";

export const socket = io(URL);
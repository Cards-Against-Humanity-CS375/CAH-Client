import socketIOClient from "socket.io-client";

const endpoint = 'https://fast-sands-73377.herokuapp.com'

const socket = socketIOClient(endpoint)

export default socket
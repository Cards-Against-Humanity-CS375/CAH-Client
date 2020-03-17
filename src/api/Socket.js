import socketIOClient from "socket.io-client";

const endpoint = 'https://fast-sands-73377.herokuapp.com'
// const endpoint = 'http://localhost:3002'

const socket = socketIOClient(endpoint)

export default socket
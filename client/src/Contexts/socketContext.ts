import { io } from 'socket.io-client'
import { createContext } from 'react'

export const socket = io('http://localhost:3001')
export const SocketContext = createContext(socket)
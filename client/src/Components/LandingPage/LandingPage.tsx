import React, { useContext, useState, useEffect } from 'react'
import { SocketContext } from '../../Contexts/socketContext';

const LandingPage:React.FC<{ gameStarting: () => void }> = ({ gameStarting }) => {

    const socket = useContext(SocketContext)
    const [connected, setConnected] = useState<boolean>(false)

    const startGame = () => {
        socket.emit('start game')
    }

    // When Landing Page first loads
    useEffect(() => {
        socket.emit('connected?')
        socket.on('connected', res => {
            setConnected(true)
        })
        socket.on('game starting', res => {
            gameStarting()
        })
        // eslint-disable-next-line
    },[])

    return(
        <main>
        <h1>Quiz Game</h1>
        {connected?
            <button onClick={startGame}>Play</button>
            :<div>Page not connected to server please refresh and try again</div>
        }
        </main>
      )

}

export default LandingPage;
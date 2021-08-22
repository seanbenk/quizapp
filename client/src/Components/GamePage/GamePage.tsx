import React, { useState, useContext, useEffect } from 'react';
import { SocketContext } from '../../Contexts/socketContext'


const GamePage:React.FC = () => {

    const socket = useContext(SocketContext)

    const newQuestion = () => {
        socket.emit('new question')
    }

    useEffect(() => {
        socket.on('new question', res => {
            console.log(res)
        })
    }, [])

    return (
        <main>
            <section>
                Question Here
            </section>
            <section>
                Answers here
                <button onClick={newQuestion}>new question</button>
            </section>
        </main>
    )
}

export default GamePage;
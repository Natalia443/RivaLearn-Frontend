import React, { useState } from "react";
import chatService from "../service/chatService.js";

export function Chat() {
    const [message, setMessage] = useState("");
    const [history, setHistory] = useState([]);

    const handleMessage = async (e) => {
        e.preventDefault();
        if (!message) {
            alert("El mensaje no puede estar vacío");
            return;
        }
        try {
            const updatedHistory = [...history, { message: message, isUser: true }];
            setHistory(updatedHistory);
            const response = await chatService.chat(message, updatedHistory);
            setMessage("");
            setHistory(prevHistory => [...prevHistory, { message: response, isUser: false }]);
        } catch (error) {
            console.error("Error al enviar el mensaje:", error);
            alert("Error al enviar el mensaje");
        }
    };

    return (
        <div className="d-flex flex-column vh-100">
            <div className="flex-grow-1 overflow-auto p-3">
                {history.map((msg, index) => (
                    <div key={index} className={`card mb-2 ${msg.isUser ? 'bg-primary text-white' : 'bg-secondary text-white'}`}>
                        <div className="card-body">
                            {msg.message}
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleMessage} className="input-group mt-auto sticky-bottom pb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Escribí un mensaje..."
                    aria-label="Escribí un mensaje..."
                    aria-describedby="button-addon2"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className="btn btn-success" type="submit" id="button-addon2">
                    Enviar
                </button>
            </form>
        </div>
    );
}

export default Chat;

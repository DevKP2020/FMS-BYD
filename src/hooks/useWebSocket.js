import { useEffect, useRef, useState } from "react";

export default function useWebSocket(url) {
    const socketRef = useRef(null)

    const [connected, setConnected] = useState(false)
    const [data, setData] = useState({
        pumps:[],
        tanks:[],
        probe:[],
        report:[],
        logs:[],
    })

    useEffect(() => {
        socketRef.current = new WebSocket(url)
        
        socketRef.current.onopen = () => {
            console.log("WebSocket Connected")
            setConnected(true)
        }

        socketRef.current.onclose = () => {
            console.log("WebSocket Disconnected")
            setConnected(false)
        }

        socketRef.current.onerror = (err) => {
            console.error("WebSocket error:", err)
        }

        socketRef.current.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data)

                if (!message?.Packets) return;

                message.Packets.forEach(packet => {
                switch (packet.Type) {

                    case "ProbeMeasurements":
                    setData(prev => ({
                        ...prev,
                        probe: [
                            ...prev.probe.filter(p => p.Probe !== packet.Data.Probe),
                            packet.Data
                        ]
                    }));
                    break;

                    case "ReportTankMeasurements":
                    setData(prev => ({
                        ...prev,
                        tanks: packet.Data,
                    }));
                    break;

                    case "PumpStatus":
                    setData(prev => ({
                        ...prev,
                        pumps: packet.Data,
                    }));
                    break;

                    default:
                    console.warn("Unhandled PTS packet:", packet.Type);
                }
                });
            } catch(e) {
                console.error("Invalid WS message" , e)
            }
        }

        return () => {
            socketRef.current?.close()
        }
    }, [url])

    const send = (payload) => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify(payload));
        }
    };

    return { connected, data, send };
}
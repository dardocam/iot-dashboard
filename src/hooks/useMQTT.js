import { useEffect, useState, useRef } from "react";
import client from "../mqttClient";

export default function useMQTT(topic, timeoutMs = 25000) {
  const [data, setData] = useState(null);
  const [online, setOnline] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    function handleConnect() {
      console.log("Conectado al broker, suscribiendo a", topic);
      client.subscribe(topic, (err) => {
        if (err) {
          console.error("Error al suscribirse:", err);
        } else {
          console.log("Suscripción exitosa a", topic);
        }
      });
    }

    function handleMessage(t, message) {
      console.log("Mensaje recibido:", t, message.toString());
      try {
        setData(JSON.parse(message.toString()));
        setOnline(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setOnline(false), timeoutMs);
      } catch (e) {
        console.error("Error al parsear mensaje:", e);
      }
    }

    client.on("connect", handleConnect);
    client.on("message", handleMessage);

    //El return dentro del useEffect en React es una función de limpieza (cleanup function).
    // Esta función se ejecuta automáticamente cuando:
    // El componente se desmonta (unmount).
    // O cuando alguna dependencia del useEffect cambia (en tu caso, si cambia topic).
    return () => {
      // Limpia los listeners para evitar fugas de memoria o comportamientos inesperados
      client.off("connect", handleConnect);
      client.off("message", handleMessage);
      clearTimeout(timer.current);
      // No cierres la conexión global aquí si usas el mismo cliente en toda la app
      // client.end();
      // Si decides cerrar la conexión, asegúrate de que no afecte a otros componentes que puedan estar usando el mismo cliente
    };
  }, [topic, timeoutMs]);

  return { data, online };
}

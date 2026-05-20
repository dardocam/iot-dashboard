// src/App.jsx
import useMQTT from "./hooks/useMQTT";

export default function App() {
  const { data, online } = useMQTT("esp32/test");

  return (
    <div>
      <h1>Dashboard IoT</h1>
      <p>Estado ESP32: {online ? "Online" : "Offline"}</p>
      {!data && !online ? (
        <p>Esperando datos...</p>
      ) : online ? (
        <div>
          <p>La medicion se actualiza aprox. cada 15 segundos</p>
          <p>Temperatura: {data.temperature} °C</p>
          <p>Humedad: {data.humidity} %</p>
        </div>
      ) : (
        <div>
          <p>ESP32 desconectado. Últimos datos recibidos:</p>
          <div>
            <p>Temperatura: {data.temperature} °C</p>
            <p>Humedad: {data.humidity} %</p>
          </div>
        </div>
      )}
    </div>
  );
}

// src/mqttClient.js
import mqtt from "mqtt";

const options = {
  username: "dardo",
  password: "Dardo1234",
  protocol: "wss",
  reconnectPeriod: 5000,
};

const client = mqtt.connect(
  "wss://a99569f0bc9044628cc88aebdc1cbb73.s1.eu.hivemq.cloud:8884/mqtt",
  options,
);

export default client;

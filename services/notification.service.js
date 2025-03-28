// const WebSocket = require("ws");

// const clients = new Set();

// const initWebSocket = (server) => {
//   const wss = new WebSocket.Server({ server });

//   wss.on("connection", (ws) => {
//     clients.add(ws);

//     ws.on("message", (message) => {
//       console.log("Received:", message);
//     });

//     ws.on("close", () => {
//       clients.delete(ws);
//     });
//   });

//   console.log("📡 WebSocket server initialized");
// };

// const sendNotification = (message) => {
//   clients.forEach((client) => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(JSON.stringify({ message }));
//     }
//   });
// };

// module.exports = { initWebSocket, sendNotification };

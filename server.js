const app = require("./app");
const logger = require("./utils/logger");
const { initWebSocket } = require("./services/notification.service");

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

// Initialize WebSocket server for real-time notifications
initWebSocket(server);

app.get('/', (req, res) => {
  res.send('Restaurant Management System API');
});

// Error handling
server.on('error', (err) => {
  logger.error('Server error:', err);
  throw err;
});
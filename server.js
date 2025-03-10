const app = require("./app");
const logger = require("./utils/logger");

const port = process.env.PORT || 8080; // Use Azure's PORT env variable or default to 8080

const server = app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Remove the error handling for EADDRINUSE as it's not needed in production
server.on('error', (err) => {
  logger.error('Server error:', err);
  throw err;
});
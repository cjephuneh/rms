const app = require("./app");
const logger = require("./utils/logger");

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  logger.info(`🚀 Server running on port ${PORT}`);
});

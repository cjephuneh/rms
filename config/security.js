const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

module.exports = (app) => {
  app.use(cors()); // Allow cross-origin requests
  app.use(helmet()); // Secure HTTP headers

  // Rate limiting (limit 100 requests per 15 min per IP)
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later."
  });

  app.use(limiter);
};

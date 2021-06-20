const winston = require("winston");
require("express-async-errors");

module.exports = function () {
  const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "user-service" },
    transports: [
      new winston.transports.Console({ colorize: true, prettyPrint: true }),
      new winston.transports.File({ filename: "error.log", level: "error", handleExceptions: true })
    ],
    exitOnError: true
  });

  if (process.env.NODE_ENV !== "production") {
    logger.add(
      new winston.transports.Console({
        format: winston.format.simple()
      })
    );
  }

  process.on("unhandledRejection", ex => {
    throw ex;
  });
};

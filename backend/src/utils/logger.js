import winston from "winston";
import config from "../config/config.js";

const { combine, timestamp, json, colorize, align, printf } = winston.format;

const logger = winston.createLogger({
  level: config.NODE_ENV === "development" ? "debug" : "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
    json()
  ),
  transports: [
    // In production, you would add transports for logging to files or services
    // new winston.transports.File({ filename: "error.log", level: "error" }),
    // new winston.transports.File({ filename: "combined.log" }),
  ],
});

// In development, log to the console with a simpler format
if (config.NODE_ENV === "development") {
  logger.add(
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }),
        align(),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
      ),
    })
  );
} else {
    logger.add(new winston.transports.Console());
}

export default logger;
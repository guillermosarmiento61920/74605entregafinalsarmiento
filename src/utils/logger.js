import winston from "winston";

const customLevels = {
  levels: {
    debug: 0,
    http: 1,
    info: 2,
    warning: 3,
    error: 4,
    fatal: 5,
  },
  colors: {
    debug: "blue",
    http: "cyan",
    info: "green",
    warning: "yellow",
    error: "red",
    fatal: "magenta",
  },
};

winston.addColors(customLevels.colors);

const buildLogger = (env) => {
  if (env === "production") {
    return winston.createLogger({
      levels: customLevels.levels,
      transports: [
        new winston.transports.File({
          filename: "./errors.log",
          level: "error",
        }),
        new winston.transports.Console({
          level: "info",
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          ),
        }),
      ],
    });
  } else {
    return winston.createLogger({
      levels: customLevels.levels,
      level: "debug",
      transports: [
        new winston.transports.Console({
          level: "debug",
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          ),
        }),
      ],
    });
  }
};

const logger = buildLogger(process.env.NODE_ENV || "development");

export default logger;

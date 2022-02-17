import winston, { Logger as WinstonLoggerType } from 'winston';

export class WinstonLoggerDevConfig {
  static config(): WinstonLoggerType {
    return winston.createLogger({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
      transports: [new winston.transports.Console({ level: 'debug' })]
    });
  }
}

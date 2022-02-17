import winston, { Logger as WinstonLoggerType } from 'winston';

export class WinstonLoggerProdConfig {
  static config(): WinstonLoggerType {
    return winston.createLogger({
      format: winston.format.combine(winston.format.json()),
      transports: [
        new winston.transports.File({
          filename: `logs/error.log`,
          level: 'error'
        }),
        new winston.transports.File({
          filename: `logs/info.log`,
          level: 'info'
        })
      ]
    });
  }
}

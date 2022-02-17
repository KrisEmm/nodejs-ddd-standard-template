import Logger from 'krisemm/context/shared/domain/logging/Logger';
import { Logger as WinstonLoggerType } from 'winston';

export class WinstonLogger implements Logger {
  private logger: WinstonLoggerType;

  constructor(logger: WinstonLoggerType) {
    this.logger = logger;
  }

  debug(message: string): void {
    this.logger.debug(message);
  }

  error(message: string | Error): void {
    this.logger.error(message);
  }

  info(message: string): void {
    this.logger.info(message);
  }
}

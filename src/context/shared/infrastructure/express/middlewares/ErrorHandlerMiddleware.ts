import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { CustomError } from 'krisemm/context/shared/domain/errors/CustomError';
import Logger from 'krisemm/context/shared/domain/logging/Logger';
import { Middleware } from 'krisemm/context/shared/infrastructure/express/middlewares/Middleware';

export class ErrorHandlerMiddleware implements Middleware {
  private readonly DEFAULT_STATUS_CODE = 500;
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  run(error: Error, req: Request, res: Response, next: NextFunction) {
    console.log('In ErrorHandlerMiddleware is ', error instanceof CustomError);
    if (error instanceof CustomError) {
      const statusCodeMapped = this.getStatusCodeMappedFor(error, req.app.get('error_mapping'));
      const responseWithError = {
        error: error.getNameError(),
        message: error.getMessageError(),
        status_code: statusCodeMapped
      };
      this.logger.error(error);
      res.status(statusCodeMapped).json(responseWithError);
      return;
    }
    this.logger.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(httpStatus[httpStatus.INTERNAL_SERVER_ERROR]);
  }

  private getStatusCodeMappedFor(error: Error, errors: Map<string, number>): number {
    const statusCodeMapped = errors.get(error.constructor.name);
    console.log(statusCodeMapped);
    return statusCodeMapped ? statusCodeMapped : this.DEFAULT_STATUS_CODE;
  }
}

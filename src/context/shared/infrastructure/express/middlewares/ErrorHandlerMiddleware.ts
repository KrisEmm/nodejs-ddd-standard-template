import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { DomainException } from 'krisemm/context/shared/domain/exceptions/DomainException';
import Logger from 'krisemm/context/shared/domain/logging/Logger';
import { ErrorMiddleware } from 'krisemm/context/shared/infrastructure/express/middlewares/ErrorMiddleware';

export class ErrorHandlerMiddleware implements ErrorMiddleware {
  private readonly DEFAULT_STATUS_CODE = 500;
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  execute(error: Error, req: Request, res: Response, next: NextFunction) {
    if (!(error instanceof DomainException)) {
      this.logger.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(httpStatus[httpStatus.INTERNAL_SERVER_ERROR]);
      return;
    }

    const statusCodeMapped = this.getStatusCodeMappedFor(error, req.app.get('exceptionCodeMapping'));

    const responseWithError = {
      error: error.name,
      message: error.message
    };

    this.logger.error(error);

    res.status(statusCodeMapped).json(responseWithError);
  }

  private getStatusCodeMappedFor(error: Error, errors: Map<string, number>): number {
    const statusCodeMapped = errors.get(error.constructor.name);
    return statusCodeMapped ?? this.DEFAULT_STATUS_CODE;
  }
}

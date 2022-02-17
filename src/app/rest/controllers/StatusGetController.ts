import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { StatusNotOKError } from 'krisemm/app/rest/controllers/StatusNotOKError';
import { RestController } from 'krisemm/context/shared/infrastructure/express/controllers/RestController';

export class StatusGetController extends RestController {
  run(req: Request, res: Response, next: NextFunction): void {
    try {
      res.send('Hello World!');
    } catch (e) {
      this.handleError(<Error>e, req, next);
    }
  }

  errorsMapping(): Map<string, number> {
    return new Map<string, number>([[StatusNotOKError.name, httpStatus.SERVICE_UNAVAILABLE]]);
  }
}

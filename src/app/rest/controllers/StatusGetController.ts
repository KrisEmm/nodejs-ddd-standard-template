import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { StatusNotOKException } from 'krisemm/app/rest/controllers/StatusNotOKException';
import { RestController } from 'krisemm/context/shared/infrastructure/express/controllers/RestController';

export class StatusGetController extends RestController {
  execute(req: Request, res: Response, next: NextFunction): void {
    try {
      res.send('Hello World!');
    } catch (e) {
      this.handleError(<Error>e, req, next);
    }
  }

  exceptionCodeMapping(): Map<string, number> {
    return new Map<string, number>([[StatusNotOKException.name, httpStatus.SERVICE_UNAVAILABLE]]);
  }
}

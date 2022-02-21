import { NextFunction, Request } from 'express';
import { Controller } from 'krisemm/context/shared/infrastructure/express/controllers/Controller';

export abstract class RestController extends Controller {
  abstract exceptionCodeMapping(): Map<string, number>;

  protected handleError(error: Error, req: Request, next: NextFunction): void {
    req.app.set('exceptionCodeMapping', this.exceptionCodeMapping());
    next(error);
  }
}

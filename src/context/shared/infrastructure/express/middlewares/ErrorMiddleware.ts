import { NextFunction, Request, Response } from 'express';

export interface ErrorMiddleware {
  execute(err: Error, req: Request, res: Response, next: NextFunction): void;
}

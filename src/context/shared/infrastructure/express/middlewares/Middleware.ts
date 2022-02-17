import { NextFunction, Request, Response } from 'express';

export interface Middleware {
  run(err: Error, req: Request, res: Response, next: NextFunction): void;
}

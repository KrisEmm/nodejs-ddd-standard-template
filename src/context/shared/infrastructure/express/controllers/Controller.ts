import { NextFunction, Request, Response } from 'express';

export abstract class Controller {
  abstract run(req: Request, res: Response, next: NextFunction): void;
}

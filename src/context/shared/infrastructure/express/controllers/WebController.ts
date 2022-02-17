import { Request, Response } from 'express';
import { Controller } from 'krisemm/context/shared/infrastructure/express/controllers/Controller';

export abstract class WebController extends Controller {
  protected render(req: Request, res: Response, template: string, data: Record<string, unknown>): void {
    res.render(template, {
      ...data
      // ...messages
    });
  }

  // validateRequest(){}
  // redirect() {}
  // redirectWithMessage() {}
  // redirectWithErrors() {}
  // setMessage(){}
  // feedMessages(){}
  // getValidFields(){}
}

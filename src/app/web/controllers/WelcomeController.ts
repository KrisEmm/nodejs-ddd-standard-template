import { Request, Response } from 'express';
import { WebController } from 'krisemm/context/shared/infrastructure/express/controllers/WebController';

export class WelcomeController extends WebController {
  execute(req: Request, res: Response): void {
    this.render(req, res, 'pages/index', { title: 'Application Web App' });
  }
}

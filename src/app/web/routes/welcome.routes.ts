import express, { Router } from 'express';
import { WelcomeController } from 'krisemm/app/web/controllers/WelcomeController';
import { container } from 'krisemm/app/web/services';

export const router: Router = express.Router();

const welcomeController: WelcomeController = container.get('App.Web.Controllers.WelcomeController');
router.get('/', welcomeController.execute.bind(welcomeController));

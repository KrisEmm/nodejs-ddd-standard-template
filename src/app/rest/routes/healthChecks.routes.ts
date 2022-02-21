import express, { Router } from 'express';
import { StatusGetController } from 'krisemm/app/rest/controllers/StatusGetController';
import { container } from 'krisemm/app/rest/services';

export const router: Router = express.Router();
/* Here import controllers from IoC container*/
const statusGetController: StatusGetController = container.get('App.Rest.Controllers.StatusGetController');
/* Here map your routes with controllers*/
router.get('/', statusGetController.execute.bind(statusGetController));

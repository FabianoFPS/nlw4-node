import { Router } from 'express';
import { SendmailController } from './controllers/SendMail.controller';

import { SurveyController } from './controllers/SurveyController';
import { UserController } from './controllers/UserController';

const router = Router();
const userController = new UserController();
const surveyController = new SurveyController();
const sendmailController = new SendmailController();

router.post('/users', userController.create);
router.post('/surveys', surveyController.create);
router.get('/surveys', surveyController.show);
router.post('/sendmail', sendmailController.execute)

export { router };
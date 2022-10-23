import { Router } from 'express';
import UserController from '../controller/user.controller';
import ValidaEmail from '../middlewares/validaEmail';
import ValidaPassword from '../middlewares/validaPassword';

const userRouter = Router();

const validaPassword = new ValidaPassword();
const validaEmail = new ValidaEmail();
const userController = new UserController();
userRouter.post('/', validaEmail.validaEmail, validaPassword.validaPassword, userController.login);
export default userRouter;

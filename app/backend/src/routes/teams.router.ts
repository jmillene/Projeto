import { Router } from 'express';
import TeamsController from '../controller/teams.controller';

const userRouter = Router();

const teamController = new TeamsController();
userRouter.get(
  '/',
  teamController.getTeams,
);
export default userRouter;

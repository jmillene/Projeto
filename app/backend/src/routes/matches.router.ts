import { Router } from 'express';
import MatchesController from '../controller/matches.controller';

const userRouter = Router();

const matchesController = new MatchesController();
userRouter.get(
  '/',
  matchesController.getMatches,
);

export default userRouter;

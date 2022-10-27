import { Router } from 'express';

import LeaderboardController from '../controller/leaderboard.controller';

const userRouter = Router();
const leaderboardController = new LeaderboardController();

userRouter.get(
  '/',
  leaderboardController.getAll,
);

export default userRouter;

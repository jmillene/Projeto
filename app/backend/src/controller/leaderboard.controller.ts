import { Request, Response } from 'express';
import LeaderboardService from '../service/leaderboard.service';

export default class LeaderboardController {
  service: LeaderboardService;
  constructor() {
    this.service = new LeaderboardService();
  }

  public getAll = async (req: Request, res: Response) => {
    const leaderboard = await this.service.getHome();
    return res.status(200).json(leaderboard);
  };
}

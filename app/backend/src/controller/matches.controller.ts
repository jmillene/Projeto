import { Request, Response } from 'express';
import MatchesService from '../service/matches.service';

export default class MatchesController {
  service: MatchesService;
  constructor() {
    this.service = new MatchesService();
  }

  public getMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress) {
      const matches = await this.service.getMatchesInprogress(
        inProgress === 'true',
      );
      return res.status(200).json(matches);
    }
    const matche = await this.service.getMatches();
    return res.status(200).json(matche);
  };
}

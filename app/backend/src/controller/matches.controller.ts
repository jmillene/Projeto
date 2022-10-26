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
    if (inProgress) {
      const matcheFalse = await this.service.getMatchesInprogress(
        inProgress === 'false',
      );
      return res.status(200).json(matcheFalse);
    }
    const matche = await this.service.getMatches();
    return res.status(200).json(matche);
  };

  public postMatches = async (req: Request, res: Response) => {
    const { body } = req;
    const { homeTeam, awayTeam } = req.body;
    const matche = await this.service.postMatches(body);
    if (homeTeam === awayTeam) {
      return res
        .status(422)
        .json({
          message: 'It is not possible to create a match with two equal teams',
        });
    }
    const home = await this.service.matchesTeamsUndefined(homeTeam);
    const away = await this.service.matchesTeamsUndefined(awayTeam);
    if (!home || !away) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    return res.status(201).json(matche);
  };

  public finishedMatches = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.service.finishedMatches(id);
    return res.status(200).json({ message: 'Finished' });
  };
}

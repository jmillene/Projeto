import { Request, Response } from 'express';
import TeamsService from '../service/teams.service';

export default class TeamsController {
  service : TeamsService;

  constructor() {
    this.service = new TeamsService();
  }

  public getTeams = async (req:Request, res : Response) => {
    const team = await this.service.getTeams();
    return res.status(200).json(team);
  };

  public getTeamsId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this.service.getTeamsId(id);
    return res.status(200).json(team);
  };
}

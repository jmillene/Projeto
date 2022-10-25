import TeamsModel from '../database/models/Teams';

export default class TeamsService {
  public getTeams = async () => {
    const team = await TeamsModel.findAll();
    return team;
  };
}

import TeamsModel from '../database/models/Teams';

export default class TeamsService {
  public getTeams = async () => {
    const teams = await TeamsModel.findAll();
    return teams;
  };

  public getTeamsId = async (id : string) => {
    try {
      const team = await TeamsModel.findByPk(id);
      return team;
    } catch (error) {
      console.log(error);
    }
  };
}

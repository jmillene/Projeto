import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import getHome from '../utils/getHome';

export default class LeaderboardService {
  public getAll = async () => {
    const teams = await Teams.findAll();
    const matches = await Matches.findAll({ where: { inProgress: 0 } });
    return { teams, matches };
  };

  public getHome = async () => {
    const { teams, matches } = await this.getAll();
    return getHome(teams, matches);
  };
}

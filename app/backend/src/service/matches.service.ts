import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import IMatches from '../interfaces/IMatches';

export default class MatchesService {
  public getMatches = async () => {
    const matches = await Matches.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  };

  public getMatchesInprogress = async (inProgress: boolean) => {
    const matches = await Matches.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  };

  public postMatches = async ({
    homeTeam,
    awayTeam,
    homeTeamGoals,
    awayTeamGoals,

  // eslint-disable-next-line max-params
  } : IMatches) => {
    const matches = await Matches.create(
      { homeTeam,
        awayTeam,
        homeTeamGoals,
        awayTeamGoals,
        inProgress: true },
    );
    return matches;
  };

  public matchesTeamsUndefined = async (id:string) => {
    const matches = await Matches.findOne({ where: { id } });
    return matches;
  };

  public finishedMatches = async (id:string) => {
    const finished = await Matches.update({ inProgress: false }, { where: { id } });
    return finished;
  };
}

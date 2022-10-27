import ILeaderboard from '../interfaces/ILeaderboard';
import ITeam from '../interfaces/IList';
import IMatches from '../interfaces/IMatches';

const leaderboardSort = (leaderboard: any) => {
  const lbb = leaderboard.sort(
    (a : ILeaderboard, b: ILeaderboard) =>
      a.totalPoints - b.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || a.goalsOwn - b.goalsOwn,
  );

  return lbb;
};
const totalVictorie = (listMatches: IMatches[], teamId: number) => {
  const totalVictore = listMatches.reduce((acc, matcheActual) => {
    const newAcc = acc;
    if (
      matcheActual.homeTeam === teamId
      && matcheActual.homeTeamGoals > matcheActual.awayTeamGoals
    ) {
      return newAcc + 1;
    }

    // if (
    //   matcheActual.awayTeam === teamId
    //   && matcheActual.awayTeamGoals > matcheActual.homeTeamGoals
    // ) {
    //   return newAcc + 1;
    // }
    return newAcc;
  }, 0);
  return totalVictore;
};

const totalGoalAFavor = (listMatches: IMatches[], teamId: number) => {
  // calcula gols a favor
  const totalGoals = listMatches.reduce((acc, matcheActual) => {
    const newAcc = acc;
    if (matcheActual.homeTeam === teamId) return newAcc + matcheActual.homeTeamGoals;
    // if (matcheActual.awayTeam === teamId) return newAcc + matcheActual.awayTeamGoals;
    return newAcc;
  }, 0);
  return totalGoals;
};
const totalGoalDraw = (listMatches: IMatches[], teamId: number) => {
  // calcular emapates
  const totalGoals = listMatches.reduce((acc, matcheActual) => {
    const newAcc = acc;
    if ((matcheActual.homeTeam === teamId)
    && matcheActual.homeTeamGoals === matcheActual.awayTeamGoals) return acc + 1;
    return newAcc;
  }, 0);
  return totalGoals;
};
const calculateLoss = (teamId: number, listMatches: IMatches[]) => {
  // calcula perdas
  const loss = listMatches.reduce((acc, matcheActual) => {
    const newAcc = acc;
    if (
      matcheActual.homeTeam === teamId
      && matcheActual.homeTeamGoals < matcheActual.awayTeamGoals
    ) {
      return acc + 1;
    }
    // if (
    //   matcheActual.awayTeam === teamId
    //   && matcheActual.awayTeamGoals < matcheActual.homeTeamGoals
    // ) {
    //   return acc + 1;
    // }
    return newAcc;
  }, 0);
  return loss;
};
const calculateGamer = (listMatches: IMatches[], teamId: number) => {
  const lista = listMatches.reduce((acc, matcheActual) => {
    const newAcc = acc;
    if (matcheActual.homeTeam === teamId || matcheActual.awayTeam === teamId) return acc + 1;
    return newAcc;
  }, 0);
  return lista;
};

const calculaGoalsOwn = (listMatches: IMatches[], teamId: number) => {
  const lista = listMatches.reduce((acc, matcheActual) => {
    const newAcc = acc;
    if (matcheActual.homeTeam === teamId) { return acc + matcheActual.awayTeamGoals; }
    // if (matcheActual.awayTeam === teamId) { return acc + matcheActual.homeTeamGoals; }
    return newAcc;
  }, 0);
  return lista;
};

const calculaPoints = (listMatches: IMatches[], teamId: number) => {
  const victories = totalVictorie(listMatches, teamId);
  const draws = totalGoalDraw(listMatches, teamId);
  return victories * 3 + draws * 1;
};

const balance = (listMatches: IMatches[], teamId: number) => {
  const goalsFavor = totalGoalAFavor(listMatches, teamId);
  const goalsOwn = calculaGoalsOwn(listMatches, teamId);
  const goalBalance = goalsFavor - goalsOwn;
  return goalBalance;
};
const calculateEfficiency = (listMatches: IMatches[], teamId: number) => {
  const totalPoints = calculaPoints(listMatches, teamId);
  const totalGames = calculateGamer(listMatches, teamId);
  return +((totalPoints / (totalGames * 3)) * 100).toFixed(2);
};
// eslint-disable-next-line max-lines-per-function
const getHome = (listTeams: ITeam[], listMatches: IMatches[]) => {
  // eslint-disable-next-line max-lines-per-function
  const lb = listTeams.map((team) => {
    const points = calculaPoints(listMatches, team.id);
    const totalGames = calculateGamer(listMatches, team.id);
    const totalLosses = calculateLoss(team.id, listMatches);
    const totalVictories = totalVictorie(listMatches, team.id);
    const totalGoalDraws = totalGoalDraw(listMatches, team.id);
    const goalsFavor = totalGoalAFavor(listMatches, team.id);
    const goalsOwn = calculaGoalsOwn(listMatches, team.id);
    const goalsBalance = balance(listMatches, team.id);
    const efficiency = calculateEfficiency(listMatches, team.id);
    const test = {
      name: team.teamName,
      points,
      totalGames,
      totalVictories,
      totalGoalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency,
    };
    return test;
  });
  return leaderboardSort(lb);
};
export default getHome;

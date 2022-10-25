import { Model, NUMBER } from 'sequelize';
import db from '.';
import Teams from './Teams';

class Matches extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: number;
}

Matches.init(
  {
    id: {
      type: NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeam: {
      type: NUMBER,
    },
    homeTeamGoals: NUMBER,
    awayTeam: {
      type: NUMBER,
    },
    awayTeamGoals: NUMBER,
    inProgress: NUMBER,
  },
  {
    sequelize: db,
    modelName: 'Matches',
    timestamps: false,
    underscored: true,
  },
);
Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'homeMatch' });
Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'awaytMatch' });
Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });
export default Matches;

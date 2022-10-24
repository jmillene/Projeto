/* eslint-disable @typescript-eslint/no-redeclare */
import bcrypt = require('bcryptjs');
import userModel from '../database/models/Users';
import decodeJwt from '../utils/Decode';

export default class UserService {
  public postlogin = async (email:string, password: string) => {
    const user = await userModel.findOne({ where: { email } });
    if (!user) {
      return { type: 401, message: 'Incorrect email or password' };
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { type: 401, message: 'Incorrect email or password' };
    }
    return user;
  };

  public getRole = (token: string) => {
    const decodeToken = decodeJwt(token);
    return decodeToken;
  };
}

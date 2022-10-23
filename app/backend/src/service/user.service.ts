import userModel from '../database/models/Users';
import Bcypt from '../utils/Bcrypt';

export default class UserService {
  public postlogin = async (email:string, password: string) => {
    const user = await userModel.findOne({ where: { email, password } });
    if (!user || !Bcypt.compare(password, user.password)) {
      return { type: 401, message: 'Incorrect email or password' };
    }
    return user;
  };
}

import userModel from '../database/models/Users';

export default class UserService {
  public postlogin = async (email:string, password: string) => {
    const user = await userModel.findOne({ where: { email, password } });
    if (!user) {
      return 'User not found';
    }
  };
}

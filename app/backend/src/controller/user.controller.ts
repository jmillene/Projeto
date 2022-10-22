import { Request, Response } from 'express';
import IUser from '../interfaces/IUser';
import UserService from '../service/user.service';
import Token from '../utils/JWT';

export default class UserController {
  service: UserService;
  token: Token;
  constructor() {
    this.service = new UserService();
    this.token = new Token();
  }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await this.service.postlogin(email, password);
    if (!email || !password) {
      return res.status(400).json({ message: 'email ou senha inexistente' });
    }
    const users = user as unknown as IUser;
    const generateToken = this.token.generateToken(
      users.id,
      users.username,
      users.role,
      users.email,
      users.password,
    );
    return res.status(200).json({ token: generateToken });
  };
}

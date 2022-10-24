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
    if ('role' in user) {
      const generateToken = this.token.generateToken(
        user.role,
        user.email,
      );
      return res.status(200).json({ token: generateToken });
    }
    if (user.type) return res.status(user.type).json({ message: user.message });
  };

  public validate = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    if (!authorization) { return res.status(401).json({ message: 'No token provided.' }); } // verifica se o token existe
    const { role } = this.service.getRole(authorization) as IUser;

    return res.status(201).json({ role });
  };
}

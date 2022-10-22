import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

export default class Token {
  generateToken = (
    id: number,
    username: string,
    role: string,
    email: string,
    password: string,
  // eslint-disable-next-line max-params
  ): string => {
    const payload = {
      id,
      username,
      role,
      email,
      password,
    };
    const secret: string = process.env.JWT_SECRET || 'cachorrocaramelo';
    const json = jwt.sign(payload, secret);
    return json;
  };
}

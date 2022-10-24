import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

export default class Token {
  generateToken = (
    role: string,
    email: string,
  ): string => {
    const payload = {
      role,
      email,
    };
    const secret: string = process.env.JWT_SECRET || 'jwt_secret';
    const json = jwt.sign(payload, secret);
    return json;
  };
}

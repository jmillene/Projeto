import * as jwt from 'jsonwebtoken';
import 'dotenv';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const validaToken = (token: string) => {
  const verifyToken = jwt.verify(token, JWT_SECRET);
  return verifyToken;
};

export default validaToken;

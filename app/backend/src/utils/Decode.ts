import { verify } from 'jsonwebtoken';
import 'dotenv/config';

const decodeJwt = (token: string) => {
  const payload = verify(token, 'jwt_secret');
  return payload;
};

export default decodeJwt;

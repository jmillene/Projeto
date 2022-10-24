import { verify } from 'jsonwebtoken';
import 'dotenv/config';

const decodeJwt = (token: string) => {
  try {
    const payload = verify(token, 'jwt_secret');
    return payload;
  } catch (error) {
    console.log(error);
  }
};

export default decodeJwt;

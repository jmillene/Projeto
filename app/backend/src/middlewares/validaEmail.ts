import { NextFunction, Request, Response } from 'express';

export default class ValidaEmail {
  validaEmail =
  (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const validacaoEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const valEmail = validacaoEmail.test(email);
    if (!email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!valEmail) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    next();
  };
}

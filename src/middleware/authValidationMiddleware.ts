import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token is required' });
  }

  const token = authorization.split(' ')[1];
  const secret = process.env.SECRET_KEY!;

  try {
    const tokenIsValid = jwt.verify(token, secret);
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Unauthorized' });
  }
};

export default authValidation;

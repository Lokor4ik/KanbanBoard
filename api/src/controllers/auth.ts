import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from 'models/User';

const { JWT_SECRET } = process.env;

const authenticate = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, JWT_SECRET as string, { expiresIn: 3600 }, (err, token) => {
      if (err) {
        throw err;
      }

      res.json({
        token,
        user,
      });
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

export default { authenticate };

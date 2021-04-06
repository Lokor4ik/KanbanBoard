import { Request, Response } from 'express';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from 'models/User/User';

import checkErrors from 'utils/middlewareErrors';

const { JWT_SECRET } = process.env;

const register = async (req: Request, res: Response) => {
  checkErrors(req, res);

  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists', severity: 'warning' }] });
    }

    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    const userData = {
      _id: user.id,
      name: user.name,
      email: user.email,
      date: user.createdAt,
    };

    jwt.sign(payload, JWT_SECRET as string, { expiresIn: 3600 }, (err, token) => {
      if (err) {
        throw err;
      }

      res.json({
        token,
        user: userData,
      });
    });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

const findByEmail = async (req: Request, res: Response) => {
  checkErrors(req, res);

  try {
    const { email } = req.query;

    const user = await User.findOne({ email: String(email) });

    res.json({ user });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

export default { register, findByEmail };

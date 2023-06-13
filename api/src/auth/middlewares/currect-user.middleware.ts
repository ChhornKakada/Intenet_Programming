import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>
  ) { }

  async use(req: Request, res: Response, next: NextFunction) {
    console.log(req.session.jwtToken);
    if (!req.session.jwtToken) {
      return res.json({
        success: false,
        error: 'You must sign in',
      });
    }

    try {
      console.log();
      
      const user = jwt.verify(req.session.jwtToken, process.env.JWT_SECRET);
      req.user = user;
      next();
    } catch (error) {
      return res.json({
        success: false,
        error: 'Invalid token',
      });
    }
  }
}

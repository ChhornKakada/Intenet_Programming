import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class EnsureSignedOutMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.session.jwtToken) {
      return res.json({
        success: false,
        error: 'You already signed in!',
      });
    }
    next();
  }
}

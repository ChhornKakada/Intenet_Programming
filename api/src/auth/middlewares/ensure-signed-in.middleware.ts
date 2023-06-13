import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

declare module 'express-session' {
  interface SessionData {
    jwtToken: string;
    // Add any other session properties you need here
  }
}

@Injectable()
export class EnsureSignedInMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.session.jwtToken) {
      return res.json({
        success: false,
        error: 'You must sign in!',
      });
    }
    next();
  }
}

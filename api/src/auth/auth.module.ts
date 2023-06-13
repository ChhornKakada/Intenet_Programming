import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from './schemas/user.schema';
import { EnsureSignedOutMiddleware } from './middlewares/ensure-signed-out.middleware';
import { EnsureSignedInMiddleware } from './middlewares/ensure-signed-in.middleware';
import { CurrentUserMiddleware } from './middlewares/currect-user.middleware';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES')
          }
        }
      }
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    // ConfigModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})

export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EnsureSignedOutMiddleware)
      .forRoutes({ path: 'auth/signup', method: RequestMethod.POST },
        { path: 'auth/login', method: RequestMethod.POST });

    consumer
      .apply(EnsureSignedInMiddleware)
      .forRoutes({ path: 'auth/logout', method: RequestMethod.POST });

    consumer
      .apply(CurrentUserMiddleware)
      .forRoutes(
        { path: 'auth/me', method: RequestMethod.GET },
        { path: 'auth/user/delete/:id', method: RequestMethod.POST },
        { path: 'auth/user/update/password', method: RequestMethod.POST },
        { path: 'auth/user/update', method: RequestMethod.POST }
      );
  }
}

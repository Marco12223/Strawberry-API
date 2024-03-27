import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './primsa/prisma.service';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { AuthController } from './auth/auth.controller';
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./auth/constants";

@Module({
  imports: [
      JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: {expiresIn: '2h'}
      }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, PrismaService, AuthService, UsersService],
})
export class AppModule {}

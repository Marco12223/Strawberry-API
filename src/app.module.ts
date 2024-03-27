import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { AuthController } from './auth/auth.controller';
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./auth/constants";
import { GuildController } from './guild/guild.controller';
import { GuildService } from './guild/guild.service';

@Module({
  imports: [
      JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: {expiresIn: '2h'}
      }),
  ],
  controllers: [AppController, AuthController, GuildController],
  providers: [AppService, PrismaService, AuthService, UsersService, GuildService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { LogsService } from './logs/logs.service';
import { LogsController } from './logs/logs.controller';
import {PrismaService} from "../prisma/prisma.service";
import { AutoroleService } from './autorole/autorole.service';

@Module({
    imports: [],
    controllers: [LogsController],
    providers: [LogsService, PrismaService, AutoroleService],
})
export class FeaturesModule {}

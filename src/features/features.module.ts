import { Module } from '@nestjs/common';
import { LogsService } from './logs/logs.service';
import { LogsController } from './logs/logs.controller';
import {PrismaService} from "../prisma/prisma.service";
import { AutoroleService } from './autorole/autorole.service';
import { AutoroleController } from './autorole/autorole.controller';

@Module({
    imports: [],
    controllers: [LogsController, AutoroleController],
    providers: [LogsService, PrismaService, AutoroleService],
})
export class FeaturesModule {}

import { Module } from '@nestjs/common';
import { LogsService } from './logs/logs.service';
import { LogsController } from './logs/logs.controller';
import {PrismaService} from "../prisma/prisma.service";

@Module({
    imports: [],
    controllers: [LogsController],
    providers: [LogsService, PrismaService],
})
export class FeaturesModule {}

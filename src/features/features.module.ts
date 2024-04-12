import { Module } from '@nestjs/common';
import { LogsService } from './logs/logs.service';
import { LogsController } from './logs/logs.controller';

@Module({
    imports: [],
    controllers: [LogsController],
    providers: [LogsService],
})
export class FeaturesModule {}

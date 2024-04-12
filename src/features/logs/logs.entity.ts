import {Prisma} from '@prisma/client';

export class FeatureLogs implements Prisma.featureLogsCreateInput {
    guildId: string;
    channelId: string;
    type: string;
}
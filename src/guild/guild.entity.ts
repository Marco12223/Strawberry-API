import {Prisma} from '@prisma/client';

export class Guild implements Prisma.guildCreateInput {
    features: Prisma.guildCreatefeaturesInput | string[];
    guildId: string;
    language: string;
}
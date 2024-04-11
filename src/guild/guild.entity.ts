import {Prisma} from '@prisma/client';

export class Guild implements Prisma.guildCreateInput {
    guildId: string;
    language: string;
}
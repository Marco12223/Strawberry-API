import {Prisma} from '@prisma/client';

export class FeatureAutorole implements Prisma.featureAutoRoleCreateInput {
    guildId: string;
    roleIds: string[];
}
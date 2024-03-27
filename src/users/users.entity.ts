import { Prisma } from '@prisma/client';

export class Users implements Prisma.apiUsersCreateInput {
    id?: string;
    password: string;
    username: string;
}
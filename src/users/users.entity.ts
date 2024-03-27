import { Prisma } from '@prisma/client';

export class Users implements Prisma.apiUsersCreateInput {
    password: string;
    username: string;
}
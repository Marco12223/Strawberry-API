import { Prisma } from '@prisma/client';

export class Users implements Prisma.apiUsersCreateInput {
    id?: number;
    password: string;
    username: string;
}
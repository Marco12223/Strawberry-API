import { Injectable } from '@nestjs/common';
import {PrismaService} from "../primsa/prisma.service";
import {apiUsers, Prisma} from "@prisma/client";
import {Users} from "./users.entity";

@Injectable()
export class UsersService {

    constructor(private readonly prismaService: PrismaService) {}

    async findOne(username: Prisma.apiUsersWhereUniqueInput): Promise<Users|undefined> {
        return this.prismaService.apiUsers.findUnique({where: username});
    }

}

import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {Prisma} from "@prisma/client";
import {Users} from "./users.entity";

@Injectable()
export class UsersService {

    constructor(private readonly prismaService: PrismaService) {}

    async findOne(where: Prisma.apiUsersWhereUniqueInput): Promise<Users|undefined> {
        return this.prismaService.apiUsers.findUnique({where});
    }

}

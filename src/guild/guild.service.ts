import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../primsa/prisma.service";
import {Prisma} from "@prisma/client";

@Injectable()
export class GuildService {

    constructor(private readonly prismaService: PrismaService) {}

    async create(data: Prisma.guildCreateInput) {
        return this.prismaService.guild.create({ data });
    }

    async get(where: Prisma.guildWhereUniqueInput) {
        let guild = await this.prismaService.guild.findUnique({ where });
        if(guild === null) {
            throw new HttpException({statusCode: HttpStatus.NOT_FOUND, error: 'Guild not found'}, HttpStatus.NOT_FOUND);
        } else {
            return guild
        }
    }

    async delete(where: Prisma.guildWhereUniqueInput) {
        let guild = await this.prismaService.guild.findUnique({ where });
        if(guild === null) {
            throw new HttpException({statusCode: HttpStatus.NOT_FOUND, error: 'Guild not found'}, HttpStatus.NOT_FOUND);
        } else {
            await this.prismaService.guild.delete({ where })
            return { message: 'Guild deleted', statusCode: 200 };
        }
    }

    async update(where: Prisma.guildWhereUniqueInput, data: Prisma.guildUpdateManyArgs) {
        let guild = await this.prismaService.guild.findUnique({ where });
        if(guild === null) {
            throw new HttpException({statusCode: HttpStatus.NOT_FOUND, error: 'Guild not found'}, HttpStatus.NOT_FOUND);
        } else {
            this.prismaService.guild.update({ where, data });
            return { message: 'Guild updated', statusCode: 200 };
        }
    }

    async exists(where: Prisma.guildWhereUniqueInput) {
        let guild = await this.prismaService.guild.findUnique({ where });
        if(guild === null) {
            throw new HttpException({statusCode: HttpStatus.NOT_FOUND, error: 'Guild not exists'}, HttpStatus.NOT_FOUND);
        } else {
            return { message: 'Guild exists', statusCode: 200 };
        }
    }

}

import { Injectable } from '@nestjs/common';
import {PrismaService} from "../primsa/prisma.service";

@Injectable()
export class GuildService {

    constructor(private readonly prismaService: PrismaService) {}

    async getGuilds() {
        return this.prismaService.guild.findMany();
    }

    async getGuild(id: number) {
        return this.prismaService.guild.findUnique({
            where: {
                id: id
            }
        });
    }

    async createGuild(guild: any) {
        return this.prismaService.guild.create({
            data: guild
        });
    }

    async updateGuild(id: number, guild: any) {
        return this.prismaService.guild.update({
            where: {
                id: id
            },
            data: guild
        });
    }

    async deleteGuild(id: number) {
        return this.prismaService.guild.delete({
            where: {
                id: id
            }
        });
    }

}

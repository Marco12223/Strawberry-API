import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {Prisma} from "@prisma/client";

@Injectable()
export class LogsService {

    constructor(private readonly prismaService: PrismaService) {}

    async create(data: Prisma.featureLogsCreateInput) {
        return this.prismaService.featureLogs.create({ data });
    }

    async get(where: Prisma.featureLogsWhereUniqueInput) {
        let logs = await this.prismaService.featureLogs.findUnique({ where });
        if(logs === null) {
            throw new HttpException({statusCode: HttpStatus.NOT_FOUND, error: 'Logs not found'}, HttpStatus.NOT_FOUND);
        } else {
            return logs
        }
    }

    async exists(where: Prisma.featureLogsWhereUniqueInput) {
        let logs = await this.prismaService.featureLogs.findUnique({ where });
        if(logs === null) {
            return false;
        } else {
            return true;
        }
    }

    async delete(where: Prisma.featureLogsWhereUniqueInput) {
        let logs = await this.prismaService.featureLogs.findUnique({ where });
        if(logs === null) {
            throw new HttpException({statusCode: HttpStatus.NOT_FOUND, error: 'Logs not found'}, HttpStatus.NOT_FOUND);
        } else {
            await this.prismaService.featureLogs.delete({ where })
            return { message: 'Logs deleted', statusCode: 200 };
        }
    }

}

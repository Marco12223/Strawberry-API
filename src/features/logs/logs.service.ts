import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {Prisma} from "@prisma/client";

@Injectable()
export class LogsService {

    constructor(private readonly prismaService: PrismaService) {}

    async get(where: Prisma.featureLogsWhereUniqueInput){
        return this.prismaService.featureLogs.findUnique({where: where});
    }

    async exists(where: Prisma.featureLogsWhereUniqueInput){
        return this.prismaService.featureLogs.findUnique({where: where}).then((data) => {
            return {exists: data !== null};
        });
    }

    async addType(where: Prisma.featureLogsWhereUniqueInput, type: string){
        if(await this.hasType(where, type)){
            throw new HttpException('Type already exists', HttpStatus.CONFLICT);
        } else {
            return this.prismaService.featureLogs.update({where: where, data: {type: {push: type}}});
        }
    }

    async removeType(where: Prisma.featureLogsWhereUniqueInput, type: string) {
        if(!await this.hasType(where, type)){
            throw new HttpException('Type not found', HttpStatus.NOT_FOUND);
        } else {
            const featureLog = await this.prismaService.featureLogs.findUnique({
                where: where,
                select: {
                    type: true
                }
            });

            if (!featureLog) {
                throw new Error('FeatureLog not found');
            }

            const updatedTypes = featureLog.type.filter(t => t !== type);

            return this.prismaService.featureLogs.update({
                where: where,
                data: {
                    type: {
                        set: updatedTypes
                    }
                }
            });
        }
    }

    async hasType(where: Prisma.featureLogsWhereUniqueInput, type: string){
        return this.prismaService.featureLogs.findUnique({where: where}).then((data) => {
            return {hasType: data.type.includes(type)};
        });
    }

}

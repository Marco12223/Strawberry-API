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

    async addType(where: Prisma.featureLogsWhereUniqueInput, type: string, channelId: string){
        const hasType = await this.hasType(where, type);
        const exists = await this.exists(where);
        if(hasType.hasType){
            throw new HttpException('Type already exists', HttpStatus.CONFLICT);
        } else {
            if(exists.exists) {
                return this.prismaService.featureLogs.update({where: where, data: {type: {push: {[type]: channelId}}}});
            } else {
                return this.prismaService.featureLogs.create({
                    data: {
                        guildId: where.guildId,
                        type: [{[type]: channelId}]
                    }
                });
            }
        }
    }

    async removeType(where: Prisma.featureLogsWhereUniqueInput, type: string) {
        const hasType = await this.hasType(where, type);
        const featureLog = await this.prismaService.featureLogs.findUnique({
            where: where,
            select: {
                type: true
            }
        });

        if (!featureLog || !featureLog.type) {
            throw new HttpException('Type or Guild not found', HttpStatus.NOT_FOUND);
        }

        // JSON-Objekt aus dem String parsen
        const typeObject = featureLog.type

        // Überprüfen, ob der Typ existiert
        if (!hasType.hasType) {
            throw new HttpException('Type does not exist', HttpStatus.NOT_FOUND);
        }

        const updatedTypeArray = typeObject.filter(item => !item.hasOwnProperty(type));

        // Array wieder in einen String umwandeln und aktualisieren
        return this.prismaService.featureLogs.update({
            where: where,
            data: {
                type: updatedTypeArray
            }
        });
    }

    async hasType(where: Prisma.featureLogsWhereUniqueInput, type: string) {
        const featureLog = await this.prismaService.featureLogs.findUnique({
            where: where,
            select: {
                type: true
            }
        });

        if (!featureLog || !featureLog.type) {
            // Wenn kein Datensatz gefunden wurde oder das type-Feld nicht existiert, geben Sie false zurück
            return { hasType: false };
        }

        // JSON-Array aus dem String parsen
        const typeArray = featureLog.type

        // Überprüfen, ob der Typ existiert
        const hasType = typeArray.some(item => item.hasOwnProperty(type));

        return { hasType };
    }

}

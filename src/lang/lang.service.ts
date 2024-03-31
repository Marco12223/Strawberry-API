import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class LangService {

    constructor(private readonly prismaService: PrismaService) {}

    private async getLanguageEndpoint(): Promise<{endpoints: [{name: string, locale: string, url: string}]}> {

        const response = await fetch("https://raw.githubusercontent.com/DFG-Dev/localizationFiles/main/endpoints.json", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        return response.json()

    }

    async getLanguageData(locale: string): Promise<{}> {

        const endpoints = await this.getLanguageEndpoint();
        const endpoint = endpoints.endpoints.find(e => e.locale === locale);
        if(!endpoint) {
            throw new HttpException({statusCode: HttpStatus.NOT_FOUND, error: 'Locale not found'}, HttpStatus.NOT_FOUND);
        } else {

            const response = await fetch(endpoint.url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            return response.json()

        }

    }

    async getAvailableLanguages(): Promise<{ locales: string[] }> {

        const endpoints = await this.getLanguageEndpoint();
        return {locales: endpoints.endpoints.map(e => e.locale)}

    }

    async updateGuildLanguage(guildId: string, locale: string): Promise<{ message: string; statusCode: number }|{error: string, message: string, statusCode: number}> {

        const availableLanguages = await this.getAvailableLanguages();
        if (!availableLanguages.locales.includes(locale)) {
            throw new HttpException({statusCode: HttpStatus.NOT_FOUND, error: 'Locale not found'}, HttpStatus.NOT_FOUND);
        } else {

            await this.prismaService.guild.update({
                where: {
                    guildId: guildId
                },
                data: {
                    language: locale
                }
            })

            return { message: 'Language updated', statusCode: HttpStatus.OK };

        }

    }

    async getGuildLanguage(guildId: string): Promise<{locale: string}> {

        const guild = await this.prismaService.guild.findUnique({
            where: {
                guildId: guildId
            }
        })

        if(!guild) {
            throw new HttpException({statusCode: HttpStatus.NOT_FOUND, error: 'Guild not found'}, HttpStatus.NOT_FOUND);
        } else {
            return {locale: guild.language}
        }

    }

}

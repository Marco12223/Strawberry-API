import { Injectable } from '@nestjs/common';
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

    async getLanguageData(locale: string): Promise<{data: []}> {

        const endpoints = await this.getLanguageEndpoint();
        const endpoint = endpoints.endpoints.find(e => e.locale === locale);
        const response = await fetch(endpoint.url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        return response.json()

    }

    async getAvailableLanguages(): Promise<{ locales: string[] }> {

        const endpoints = await this.getLanguageEndpoint();
        return {locales: endpoints.endpoints.map(e => e.locale)}

    }

}

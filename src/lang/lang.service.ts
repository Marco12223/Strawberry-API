import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class LangService {

    constructor(private readonly prismaService: PrismaService) {}

    async getLanguageEndpoint(): Promise<{endpoints: []}> {

        const response = await fetch("https://raw.githubusercontent.com/DFG-Dev/localizationFiles/main/endpoints.json", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        return response.json()

    }

}

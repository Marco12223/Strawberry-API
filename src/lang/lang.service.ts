import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class LangService {

    constructor(private readonly prismaService: PrismaService) {}

}

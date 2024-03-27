import {Controller, Get, Param, UseGuards} from '@nestjs/common';
import {GuildService} from "./guild.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "../auth/auth.guard";

@ApiTags('Guild Management')
@Controller('guild')
export class GuildController {

    constructor(private guildService: GuildService) {}

    @Get(':guildId')
    @UseGuards(AuthGuard)
    @ApiOperation({summary: 'Get guild by guildId', description: 'Get guild by guildId, IMPORTANT: The user must be logged in to access this endpoint'})
    @ApiResponse({status: 200, description: 'Guild found', schema: {example: {guildId: 'string', language: 'string', features: ['string']}}})
    @ApiResponse({status: 404, description: 'Guild not found', schema: {example: {statusCode: 404, error: 'Guild not found'}}})
    @ApiResponse({status: 401, description: 'Unauthorized', schema: {example: {statusCode: 401, error: 'Unauthorized', message: "Unauthorized"}}})
    async get(@Param('guildId') guildId: string){
        return this.guildService.get({guildId: guildId});
    }

}

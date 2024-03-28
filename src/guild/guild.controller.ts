import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {GuildService} from "./guild.service";
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "../auth/auth.guard";
import {Prisma} from "@prisma/client";

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
    @ApiResponse({status: 500, description: 'Internal Server Error', schema: {example: {statusCode: 500, error: 'Internal Server Error'}}})
    @ApiResponse({status: 400, description: 'Bad Request', schema: {example: {statusCode: 400, error: 'Bad Request'}}})
    @ApiParam({name: 'guildId', description: 'Guild ID', required: true, schema: {type: 'string'}})
    async get(@Param('guildId') guildId: string){
        return this.guildService.get({guildId: guildId});
    }

    @Delete(':guildId')
    @UseGuards(AuthGuard)
    @ApiOperation({summary: 'Delete guild by guildId', description: 'Delete guild by guildId, IMPORTANT: The user must be logged in to access this endpoint'})
    @ApiResponse({status: 200, description: 'Guild deleted', schema: {example: {message: 'Guild deleted', statusCode: 200}}})
    @ApiResponse({status: 404, description: 'Guild not found', schema: {example: {statusCode: 404, error: 'Guild not found'}}})
    @ApiResponse({status: 401, description: 'Unauthorized', schema: {example: {statusCode: 401, error: 'Unauthorized', message: "Unauthorized"}}})
    @ApiResponse({status: 500, description: 'Internal Server Error', schema: {example: {statusCode: 500, error: 'Internal Server Error'}}})
    @ApiResponse({status: 400, description: 'Bad Request', schema: {example: {statusCode: 400, error: 'Bad Request'}}})
    @ApiParam({name: 'guildId', description: 'Guild ID', required: true, schema: {type: 'string'}})
    async delete(@Param('guildId') guildId: string){
        return this.guildService.delete({guildId: guildId});
    }

    @Post(':guildId')
    @UseGuards(AuthGuard)
    @ApiOperation({summary: 'Create guild', description: 'Create guild, IMPORTANT: The user must be logged in to access this endpoint'})
    @ApiResponse({status: 201, description: 'Guild created', schema: {example: {guildId: 'string', language: 'string', features: ['string']}}})
    @ApiResponse({status: 401, description: 'Unauthorized', schema: {example: {statusCode: 401, error: 'Unauthorized', message: "Unauthorized"}}})
    @ApiResponse({status: 500, description: 'Internal Server Error', schema: {example: {statusCode: 500, error: 'Internal Server Error'}}})
    @ApiResponse({status: 400, description: 'Bad Request', schema: {example: {statusCode: 400, error: 'Bad Request'}}})
    @ApiBody({schema: {example: {guildId: 'string', language: 'string', features: ['string']}}})
    async create(@Body() body: Prisma.guildCreateInput){
        return this.guildService.create(body);
    }

    @Get(':guildId/exists')
    @UseGuards(AuthGuard)
    @ApiOperation({summary: 'Check if guild exists', description: 'Check if guild exists, IMPORTANT: The user must be logged in to access this endpoint'})
    @ApiResponse({status: 200, description: 'Guild exists', schema: {example: {message: 'Guild exists', statusCode: 200}}})
    @ApiResponse({status: 404, description: 'Guild not found', schema: {example: {statusCode: 404, error: 'Guild not exists'}}})
    @ApiResponse({status: 401, description: 'Unauthorized', schema: {example: {statusCode: 401, error: 'Unauthorized', message: "Unauthorized"}}})
    @ApiResponse({status: 500, description: 'Internal Server Error', schema: {example: {statusCode: 500, error: 'Internal Server Error'}}})
    @ApiResponse({status: 400, description: 'Bad Request', schema: {example: {statusCode: 400, error: 'Bad Request'}}})
    @ApiParam({name: 'guildId', description: 'Guild ID', required: true, schema: {type: 'string'}})
    async exists(@Param('guildId') guildId: string){
        return this.guildService.exists({guildId: guildId});
    }

}

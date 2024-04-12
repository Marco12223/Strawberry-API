import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {LogsService} from "./logs.service";
import {AuthGuard} from "../../auth/auth.guard";
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller('features/logs')
@ApiTags('GuildLogs Management')
export class LogsController {

    constructor(private readonly logsService: LogsService) {}

    @Get(':guildId')
    @UseGuards(AuthGuard)
    @ApiOperation({summary: 'Get logs by guildId', description: 'Get logs by guildId, IMPORTANT: The user must be logged in to access this endpoint'})
    @ApiResponse({status: 200, description: 'Logs found', schema: {example: {guildId: 'string', channelId: 'string', logs: ['string']}}})
    @ApiResponse({status: 404, description: 'Logs not found', schema: {example: {statusCode: 404, error: 'Logs not found'}}})
    @ApiResponse({status: 401, description: 'Unauthorized', schema: {example: {statusCode: 401, error: 'Unauthorized', message: "Unauthorized"}}})
    @ApiResponse({status: 500, description: 'Internal Server Error', schema: {example: {statusCode: 500, error: 'Internal Server Error'}}})
    @ApiResponse({status: 400, description: 'Bad Request', schema: {example: {statusCode: 400, error: 'Bad Request'}}})
    @ApiParam({name: 'guildId', description: 'The guildId of the logs', required: true, schema: {type: 'string'}})
    async get(@Param('guildId') guildId: string){
        return this.logsService.get({guildId: guildId});
    }

    @Get(':guildId/exists')
    @UseGuards(AuthGuard)
    @ApiOperation({summary: 'Check if logs exists', description: 'Check if logs exists, IMPORTANT: The user must be logged in to access this endpoint'})
    @ApiResponse({status: 200, description: 'Logs found', schema: {example: {exists: true}}})
    @ApiResponse({status: 404, description: 'Logs not found', schema: {example: {exists: false}}})
    @ApiResponse({status: 401, description: 'Unauthorized', schema: {example: {statusCode: 401, error: 'Unauthorized', message: "Unauthorized"}}})
    @ApiResponse({status: 500, description: 'Internal Server Error', schema: {example: {statusCode: 500, error: 'Internal Server Error'}}})
    @ApiResponse({status: 400, description: 'Bad Request', schema: {example: {statusCode: 400, error: 'Bad Request'}}})
    @ApiParam({name: 'guildId', description: 'The guildId of the logs', required: true, schema: {type: 'string'}})
    @ApiBody({schema: {example: {type: 'string'}}})
    async exists(@Param('guildId') guildId: string, @Body() body: {type: string}){
        return this.logsService.exists({guildId: guildId, type: body.type});
    }

    @Post(':guildId')
    @UseGuards(AuthGuard)
    @ApiOperation({summary: 'Create logs', description: 'Create logs, IMPORTANT: The user must be logged in to access this endpoint'})
    @ApiResponse({status: 200, description: 'Logs created', schema: {example: {guildId: 'string', channelId: 'string', logs: ['string']}}})
    @ApiResponse({status: 401, description: 'Unauthorized', schema: {example: {statusCode: 401, error: 'Unauthorized', message: "Unauthorized"}}})
    @ApiResponse({status: 500, description: 'Internal Server Error', schema: {example: {statusCode: 500, error: 'Internal Server Error'}}})
    @ApiResponse({status: 400, description: 'Bad Request', schema: {example: {statusCode: 400, error: 'Bad Request'}}})
    @ApiParam({name: 'guildId', description: 'The guildId of the logs', required: true, schema: {type: 'string'}})
    @ApiBody({schema: {example: {guildId: 'string', channelId: 'string', type: 'string'}}})
    async create(@Param('guildId') guildId: string, @Body() body: {channelId: string, type: string}){
        return this.logsService.create({guildId: guildId, channelId: body.channelId, type: body.type});
    }

    @Delete(':guildId')
    @UseGuards(AuthGuard)
    @ApiOperation({summary: 'Delete logs', description: 'Delete logs, IMPORTANT: The user must be logged in to access this endpoint'})
    @ApiResponse({status: 200, description: 'Logs deleted', schema: {example: {message: 'Logs deleted', statusCode: 200}}})
    @ApiResponse({status: 404, description: 'Logs not found', schema: {example: {statusCode: 404, error: 'Logs not found'}}})
    @ApiResponse({status: 401, description: 'Unauthorized', schema: {example: {statusCode: 401, error: 'Unauthorized', message: "Unauthorized"}}})
    @ApiResponse({status: 500, description: 'Internal Server Error', schema: {example: {statusCode: 500, error: 'Internal Server Error'}}})
    @ApiResponse({status: 400, description: 'Bad Request', schema: {example: {statusCode: 400, error: 'Bad Request'}}})
    @ApiParam({name: 'guildId', description: 'The guildId of the logs', required: true, schema: {type: 'string'}})
    async delete(@Param('guildId') guildId: string){
        return this.logsService.delete({guildId: guildId});
    }

}

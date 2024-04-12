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
    async exists(@Param('guildId') guildId: string){
        return this.logsService.exists({guildId: guildId});
    }

    @Get(':guildId/hasType/:type')
    @UseGuards(AuthGuard)
    @ApiOperation({summary: 'Check if logs has type', description: 'Check if logs has type, IMPORTANT: The user must be logged in to access this endpoint'})
    @ApiResponse({status: 200, description: 'Type found', schema: {example: {hasType: true}}})
    @ApiResponse({status: 404, description: 'Type not found', schema: {example: {hasType: false}}})
    @ApiResponse({status: 401, description: 'Unauthorized', schema: {example: {statusCode: 401, error: 'Unauthorized', message: "Unauthorized"}}})
    @ApiResponse({status: 500, description: 'Internal Server Error', schema: {example: {statusCode: 500, error: 'Internal Server Error'}}})
    @ApiResponse({status: 400, description: 'Bad Request', schema: {example: {statusCode: 400, error: 'Bad Request'}}})
    @ApiParam({name: 'guildId', description: 'The guildId of the logs', required: true, schema: {type: 'string'}})
    @ApiParam({name: 'type', description: 'The type of the logs', required: true, schema: {type: 'string'}})
    async hasType(@Param('guildId') guildId: string, @Param('type') type: string){
        return this.logsService.hasType({guildId: guildId}, type);
    }

    @Post(':guildId/:type')
    @UseGuards(AuthGuard)
    @ApiOperation({summary: 'Create logs', description: 'Create logs, IMPORTANT: The user must be logged in to access this endpoint'})
    @ApiResponse({status: 200, description: 'Logs created', schema: {example: {guildId: 'string', channelId: 'string', logs: ['string']}}})
    @ApiResponse({status: 401, description: 'Unauthorized', schema: {example: {statusCode: 401, error: 'Unauthorized', message: "Unauthorized"}}})
    @ApiResponse({status: 500, description: 'Internal Server Error', schema: {example: {statusCode: 500, error: 'Internal Server Error'}}})
    @ApiResponse({status: 400, description: 'Bad Request', schema: {example: {statusCode: 400, error: 'Bad Request'}}})
    @ApiParam({name: 'guildId', description: 'The guildId of the logs', required: true, schema: {type: 'string'}})
    @ApiParam({name: 'type', description: 'The type of the logs', required: true, schema: {type: 'string'}})
    async addType(@Param('guildId') guildId: string, @Param('type') type: string){
        return this.logsService.addType({guildId: guildId}, type);
    }

    @Delete(':guildId/:type')
    @UseGuards(AuthGuard)
    @ApiOperation({summary: 'Delete logs', description: 'Delete logs, IMPORTANT: The user must be logged in to access this endpoint'})
    @ApiResponse({status: 200, description: 'Logs deleted', schema: {example: {message: 'Logs deleted', statusCode: 200}}})
    @ApiResponse({status: 404, description: 'Logs not found', schema: {example: {statusCode: 404, error: 'Logs not found'}}})
    @ApiResponse({status: 401, description: 'Unauthorized', schema: {example: {statusCode: 401, error: 'Unauthorized', message: "Unauthorized"}}})
    @ApiResponse({status: 500, description: 'Internal Server Error', schema: {example: {statusCode: 500, error: 'Internal Server Error'}}})
    @ApiResponse({status: 400, description: 'Bad Request', schema: {example: {statusCode: 400, error: 'Bad Request'}}})
    @ApiParam({name: 'guildId', description: 'The guildId of the logs', required: true, schema: {type: 'string'}})
    @ApiParam({name: 'type', description: 'The type of the logs', required: true, schema: {type: 'string'}})
    async removeType(@Param('guildId') guildId: string, @Param('type') type: string){
        return this.logsService.removeType({guildId: guildId}, type)
    }

}

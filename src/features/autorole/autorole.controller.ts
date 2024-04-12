import {Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AutoroleService} from "./autorole.service";
import {AuthGuard} from "../../auth/auth.guard";

@Controller('features/autorole')
@ApiTags('Autorole Management')
export class AutoroleController {

    constructor(private readonly autoroleService: AutoroleService) {}

    @Get(':guildId')
    @UseGuards(AuthGuard)
    @ApiOperation({summary: 'Get autorole by guildId', description: 'Get autorole by guildId, IMPORTANT: The user must be logged in to access this endpoint'})
    @ApiResponse({status: 200, description: 'Logs found', schema: {example: {exists: true}}})
    @ApiResponse({status: 404, description: 'Logs not found', schema: {example: {exists: false}}})
    @ApiResponse({status: 401, description: 'Unauthorized', schema: {example: {statusCode: 401, error: 'Unauthorized', message: "Unauthorized"}}})
    @ApiResponse({status: 500, description: 'Internal Server Error', schema: {example: {statusCode: 500, error: 'Internal Server Error'}}})
    @ApiResponse({status: 400, description: 'Bad Request', schema: {example: {statusCode: 400, error: 'Bad Request'}}})
    @ApiParam({name: 'guildId', description: 'The guildId of the autorole', required: true, schema: {type: 'string'}})
    async get(@Param('guildId') guildId: string){
        return this.autoroleService.exists(guildId);
    }

    @Post(':guildId/:roleId')
    @UseGuards(AuthGuard)
    @ApiOperation({summary: 'Create autorole', description: 'Create autorole, IMPORTANT: The user must be logged in to access this endpoint'})
    @ApiResponse({status: 200, description: 'Autorole created', schema: {example: {guildId: 'string', roleIds: ['string']}}})
    @ApiResponse({status: 401, description: 'Unauthorized', schema: {example: {statusCode: 401, error: 'Unauthorized', message: "Unauthorized"}}})
    @ApiResponse({status: 500, description: 'Internal Server Error', schema: {example: {statusCode: 500, error: 'Internal Server Error'}}})
    @ApiResponse({status: 400, description: 'Bad Request', schema: {example: {statusCode: 400, error: 'Bad Request'}}})
    @ApiParam({name: 'guildId', description: 'The guildId of the autorole', required: true, schema: {type: 'string'}})
    @ApiParam({name: 'roleId', description: 'The roleId of the autorole', required: true, schema: {type: 'string'}})
    async create(@Param('guildId') guildId: string, @Param('roleId') roleId: string){
        return this.autoroleService.addRole(guildId, roleId);
    }

    @Delete(':guildId/:roleId')
    @UseGuards(AuthGuard)
    @ApiOperation({summary: 'Delete autorole', description: 'Delete autorole, IMPORTANT: The user must be logged in to access this endpoint'})
    @ApiResponse({status: 200, description: 'Autorole deleted', schema: {example: {message: 'Autorole deleted', statusCode: 200}}})
    @ApiResponse({status: 404, description: 'Autorole not found', schema: {example: {statusCode: 404, error: 'Autorole not found'}}})
    @ApiResponse({status: 401, description: 'Unauthorized', schema: {example: {statusCode: 401, error: 'Unauthorized', message: "Unauthorized"}}})
    @ApiResponse({status: 500, description: 'Internal Server Error', schema: {example: {statusCode: 500, error: 'Internal Server Error'}}})
    @ApiResponse({status: 400, description: 'Bad Request', schema: {example: {statusCode: 400, error: 'Bad Request'}}})
    @ApiParam({name: 'guildId', description: 'The guildId of the autorole', required: true, schema: {type: 'string'}})
    @ApiParam({name: 'roleId', description: 'The roleId of the autorole', required: true, schema: {type: 'string'}})
    async delete(@Param('guildId') guildId: string, @Param('roleId') roleId: string){
        return this.autoroleService.removeRole(guildId, roleId);
    }


}

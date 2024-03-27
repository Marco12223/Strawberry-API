import {Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {LangService} from "./lang.service";
import {ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "../auth/auth.guard";

@ApiTags('Language Management')
@Controller('lang')
export class LangController {

    constructor(private readonly langService: LangService) {}

    @Get('available-languages')
    @UseGuards(AuthGuard)
    @ApiOperation({summary: 'Get available languages', description: 'Get available languages, IMPORTANT: The user must be logged in to access this endpoint'})
    @ApiResponse({status: 200, description: 'Languages found', schema: {example: {locales: ['string']}}})
    @ApiResponse({status: 401, description: 'Unauthorized', schema: {example: {statusCode: 401, error: 'Unauthorized', message: "Unauthorized"}}})
    @ApiResponse({status: 500, description: 'Internal Server Error', schema: {example: {statusCode: 500, error: 'Internal Server Error'}}})
    async getAvailableLanguages(): Promise<{ locales: string[] }> {
        return this.langService.getAvailableLanguages();
    }

    @Get(':locale')
    @UseGuards(AuthGuard)
    @ApiOperation({summary: 'Get language data', description: 'Get language data, IMPORTANT: The user must be logged in to access this endpoint'})
    @ApiResponse({status: 200, description: 'Language data found', schema: {example: {}}})
    @ApiResponse({status: 401, description: 'Unauthorized', schema: {example: {statusCode: 401, error: 'Unauthorized', message: "Unauthorized"}}})
    @ApiResponse({status: 500, description: 'Internal Server Error', schema: {example: {statusCode: 500, error: 'Internal Server Error'}}})
    @ApiParam({name: 'locale', description: 'Locale', required: true, schema: {type: 'string'}})
    async getLanguageData(@Param('locale') locale: string): Promise<{}> {
        return this.langService.getLanguageData(locale);
    }

    @Post(':guildId/:locale')
    @UseGuards(AuthGuard)
    @ApiOperation({summary: 'Update guild language', description: 'Update guild language, IMPORTANT: The user must be logged in to access this endpoint'})
    @ApiResponse({status: 200, description: 'Language updated', schema: {example: {message: 'Language updated', statusCode: 200}}})
    @ApiResponse({status: 400, description: 'Invalid locale', schema: {example: {error: 'Invalid locale', message: 'Invalid locale', statusCode: 400}}})
    @ApiResponse({status: 401, description: 'Unauthorized', schema: {example: {statusCode: 401, error: 'Unauthorized', message: "Unauthorized"}}})
    @ApiResponse({status: 500, description: 'Internal Server Error', schema: {example: {statusCode: 500, error: 'Internal Server Error'}}})
    @ApiParam({name: 'guildId', description: 'Guild ID', required: true, schema: {type: 'string'}})
    @ApiParam({name: 'locale', description: 'Locale', required: true, schema: {type: 'string'}})
    async updateGuildLanguage(@Param('guildId') guildId: string, @Param('locale') locale: string): Promise<{ message: string; statusCode: number }|{error: string, message: string, statusCode: number}> {
        return this.langService.updateGuildLanguage(guildId, locale);
    }

}

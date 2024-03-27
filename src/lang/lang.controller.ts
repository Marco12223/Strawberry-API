import {Controller, Get, Param, UseGuards} from '@nestjs/common';
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

}

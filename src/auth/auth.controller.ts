import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";


@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('')
    @ApiOperation({summary: 'Login to the application', description: 'Login to the application, IMPORTANT: The user must be registered by an admin before logging in is possible to the application'})
    @ApiResponse({status: 201, description: 'User logged in successfully', schema: {example: {access_token: 'string'}}})
    @ApiResponse({status: 500, description: 'Internal server error', schema: {example: {statusCode: 500, message: 'Internal server error'}}})
    @ApiBody({schema: {example: {username: 'string', password: 'string'}}})
    login(@Body() body: {username: string, password: string}){
        return this.authService.signIn(body.username, body.password);
    }

}

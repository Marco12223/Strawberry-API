import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {Prisma} from "@prisma/client";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('login')
    login(@Body() body: {username: string, password: string}){
        return this.authService.signIn(body.username, body.password);
    }

}

import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {jwtConstants} from "./constants";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private  jwtService: JwtService) {}

    async signIn(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne({username: username});

        if(user && user.password !== password) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { username: user.username, sub: user.id };

        return {
            access_token: this.jwtService.sign(payload),
        };

    }

    async verify(token: string): Promise<any> {

        try {
            await this.jwtService.verifyAsync(token, {secret: jwtConstants.secret});
            return {valid: true};
        } catch (e) {
            return {valid: false};
        }

    }

}

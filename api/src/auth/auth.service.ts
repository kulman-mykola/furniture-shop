import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { register } from 'tsconfig-paths';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async auth(authDto: SignUpDto) {
        const user = await this.usersService.findOne(authDto.email);

        if (!user) {
            return this.register(authDto);
        }

        const authorized = await bcrypt.compare(authDto.password, user.password);

        if (!authorized) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, username: user.email };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async register(signUpDto: SignUpDto): Promise<any> {
        const hashed = await bcrypt.hash(signUpDto.password, 10);

        const user = await this.usersService.create({
            email: signUpDto.email,
            password: hashed,
        });

        const payload = { sub: user.id, email: user.email };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    findAll() {
        return `This action returns all auth`;
    }

    findOne(id: number) {
        return `This action returns a #${id} auth`;
    }

    remove(id: number) {
        return `This action removes a #${id} auth`;
    }
}

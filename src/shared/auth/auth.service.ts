import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { sign, SignOptions } from 'jsonwebtoken';
import { User } from 'src/user/models/user.model';
import { UserService } from 'src/user/user.service';
import { InstanceType } from 'typegoose';
import { Configuration } from '../configuration/configuration.enum';
import { ConfigurationService } from '../configuration/configuration.service';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class AuthService {
    private readonly jwtOptions: SignOptions;
    private readonly jwtKey: string;

    constructor(
        @Inject(forwardRef(() => UserService))
        readonly _userService: UserService,
        readonly _configurationService: ConfigurationService,
    ) {
        this.jwtOptions = { expiresIn: '12h' };
        this.jwtKey = _configurationService.get(Configuration.JWT_KEY);
    }

    async signPayload(payload: JwtPayload): Promise<string> {
        return sign(payload, this.jwtKey, this.jwtOptions);
    }

    async validatePayload(payload: JwtPayload): Promise<InstanceType<User>> {
        return this._userService.findOne({ username: payload.username.toLowerCase() });
    }
}

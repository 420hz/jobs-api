import { Global, Module } from '@nestjs/common';
import { ConfigurationService } from './configuration/configuration.service';
import { MapperService } from './mapper/mapper.service';
import { AuthService } from './auth/auth.service';
import { UserModule } from 'src/user/user.module';
import { StrategiesService } from './auth/strategies/strategies.service';

@Global()
@Module({
  providers: [ConfigurationService, MapperService, AuthService, StrategiesService],
  exports: [ConfigurationService, MapperService, AuthService],
  imports: [UserModule],
})
export class SharedModule { }

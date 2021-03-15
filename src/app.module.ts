import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Configuration } from './shared/configuration/configuration.enum';
import { ConfigurationService } from './shared/configuration/configuration.service';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { StrategiesService } from './shared/auth/strategies/strategies.service';

@Module({
  imports: [SharedModule, MongooseModule.forRoot(ConfigurationService.connectionString, { useNewUrlParser: true, useUnifiedTopology: true }), UserModule],
  controllers: [AppController],
  providers: [AppService, StrategiesService],
})
export class AppModule {

  static host: string;
  static port: number | string;
  static isDev: boolean;

  constructor(private readonly _configurationService: ConfigurationService) {
    AppModule.port = AppModule.nomalizePort(_configurationService.get(Configuration.PORT));
    AppModule.host = _configurationService.get(Configuration.HOST);
    AppModule.isDev = _configurationService.isDevelopment;
  }

  private static nomalizePort(param: number | string): number | string {
    const portNumber: number = typeof param === 'string' ? parseInt(param, 10) : param;
    if (isNaN(portNumber)) {
      return param;
    } else if (portNumber >= 0) return portNumber;
  }
}

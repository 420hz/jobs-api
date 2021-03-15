import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';

declare const module: any;

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const hostDomain = AppModule.isDev ? `${AppModule.host}:${AppModule.port}` : `${AppModule.port}`;
  console.log(hostDomain);
  
  const configSwagger = new DocumentBuilder()
    .setTitle('nestjs-mongodb')
    .setDescription('restful api')
    .setVersion('1.0.0')
    .addServer(AppModule.isDev ? 'http://' : 'https://')
   //.setBasePath('api')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    }, 'access-token')
    .build()

  const documentSwagger = SwaggerModule.createDocument(app, configSwagger);

  app.use('/api/docs', (req, res) => {
    res.send(documentSwagger);
  });

  SwaggerModule.setup('api', app, documentSwagger
  // , {
  //   swaggerUrl: `${hostDomain}/api/docs/swagger.json`,
  //   explorer: true,
  //   swaggerOptions: {
  //     docExpansion: 'list',
  //     filter: true,
  //     showRequestDuration: true,
  //   }
  //   }
  );

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => { app.close() });
  }

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(AppModule.port);
}

bootstrap();

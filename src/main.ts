import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const hostDomain = AppModule.isDev ? `${AppModule.host}:${AppModule.port}` : `${AppModule.port}`;

  const swaggerOptions = new DocumentBuilder()
    .setTitle('nestjs-mongodb')
    .setDescription('restful api')
    .setVersion('1.0.0')
    .addServer(AppModule.isDev ? 'http://' : 'https://')
    .setBasePath('api')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    }, 'access-token')
    .build()

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);

  app.use('/api/docs/swagger.json', (req, res) => {
    res.send(swaggerDoc);
  });

  SwaggerModule.setup('api/docs', app, null, {
    swaggerUrl: `${hostDomain}/api/docs/swagger.json`,
    explorer: true,
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    }
  })

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => { app.close() });
  }

  app.setGlobalPrefix('api')

  await app.listen(AppModule.port);
}
bootstrap();

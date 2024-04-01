import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { LoggingService } from './logging/logging.service';
import { AllExceptionsFilter } from './helpers/all-exceptions.filter';
// import metadata from './metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const httpAdapter = app.get(HttpAdapterHost);

  const logger = await app.resolve(LoggingService);

  const port = configService.get<number>('PORT');

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0')
    .build();
  // await SwaggerModule.loadPluginMetadata(metadata);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter, logger));

  process.on('uncaughtException ', (reason) => {
    logger.log('uncaughtException');
    logger.error(reason);
    throw reason;
  });

  process.on('unhandledRejection', (reason) => {
    logger.log('unhandledRejection');
    logger.error(reason);
  });

  await app.listen(port);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

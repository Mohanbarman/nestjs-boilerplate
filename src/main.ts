import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import validationOptions from './utils/validation-options';
import { TransformationInterceptor } from './utils/response-interceptor';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService = app.get(ConfigService);
  const appPort = configService.get<number>('app.port');

  app.useGlobalInterceptors(new TransformationInterceptor());
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI });
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(appPort);
  console.log(`listening on http://localhost:${appPort}/api 🚀`);
}
bootstrap();

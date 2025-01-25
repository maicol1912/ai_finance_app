import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvConfig } from './config/env.schema.config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import path from 'path';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import fs from "fs"

const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};


const nestHttpApplication = async <T>(
  moduleClass: T,
): Promise<INestApplication> => {
  return await NestFactory.create(moduleClass, {
    snapshot: true,
  });
};

const nestHttpsApplication = async <T>(
  moduleClass: T,
): Promise<INestApplication> => {
  const keyPath = path.join(__dirname, 'certs', 'key.pem');
  const certPath = path.join(__dirname, 'certs', 'cert.pem');

  const httpsOptions = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  };
  return await NestFactory.create(moduleClass, {
    httpsOptions,
    snapshot: true,
  });
};


const nestEnviromentApplication = async <T>(
  moduleClass: T,
): Promise<INestApplication> => {
  return isProduction()
    ? await nestHttpsApplication(moduleClass)
    : await nestHttpApplication(moduleClass);
};


export const nestApplication = async <T>(
  moduleClass: T,
): Promise<INestApplication> => {
  const app = await nestEnviromentApplication(moduleClass);

  const limiter = rateLimit({
    windowMs: 1 * 6 * 1000,
    max: 30,
  });

  app.use(helmet());
  app.use(cors());
  app.use(mongoSanitize());
  app.use(compression());
  app.use(limiter);
  app.enableCors()
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions:{
        enableImplicitConversion: true
      }
    })
  )

  await app.listen(EnvConfig.SERVER_PORT, ()=>{
    console.log(`🌟 Server mod ${process.env.NODE_ENV} is running PORT: ${EnvConfig.SERVER_PORT} 🌟`)
  });
  return app;
};

async function bootstrap() {
  await nestApplication(AppModule);
}


process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught Exception thrown:', error);
});

bootstrap();

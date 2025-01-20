import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvConfig } from './config/env.schema.config';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const limiter = rateLimit({
    windowMs: 1 * 6 * 1000,
    max: 30,
  });

  app.use(helmet());
  app.use(cors());
  app.use(mongoSanitize());
  app.use(compression());
  app.use(limiter);
  await app.listen(EnvConfig.SERVER_PORT, ()=>{
    console.log(`Server Mode ${process.env.NODE_ENV} is running PORT: ${EnvConfig.SERVER_PORT}`)
  });
}

bootstrap();

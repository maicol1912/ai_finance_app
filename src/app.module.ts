import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig } from './config/env.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      load : [()=> EnvConfig]
    })
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

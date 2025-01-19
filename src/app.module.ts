import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig } from './config/env.schema';
import { LangchainService } from './ai/langchain.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      load : [()=> EnvConfig]
    })
  ],
  controllers: [AppController],
  providers: [LangchainService],
})
export class AppModule {}

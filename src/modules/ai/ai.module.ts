import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HuggingFaceService } from './application/services/hugging-face.service';
import { HuggingFaceController } from './api/http/hugging-face.controller';

@Module({
  imports: [
    ConfigModule
  ],
  controllers: [HuggingFaceController],
  providers: [HuggingFaceService],
  exports: [HuggingFaceService],
})
export class AiModule {}
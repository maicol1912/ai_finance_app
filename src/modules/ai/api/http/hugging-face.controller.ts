import { Body, Controller, Get, Query, Sse } from '@nestjs/common';
import { HuggingFaceService } from '@ai/application/services/hugging-face.service';
import { map, Observable } from 'rxjs';

@Controller('ai')
export class HuggingFaceController {
  constructor(private readonly huggingFaceService:HuggingFaceService) {}

  @Get('chat')
  async chat(){
    return await this.huggingFaceService.staticChat('Ayúdame generándome una respuesta de cómo puedo ahorrar?')
  }

  @Sse('stream')
  async streamChat(@Query('question') question: string): Promise<Observable<MessageEvent>> {
    return (await this.huggingFaceService.streamChat(question)).pipe(
      map(content => ({
        data: {
          content,
        }
      }) as MessageEvent),
    );
  }
}

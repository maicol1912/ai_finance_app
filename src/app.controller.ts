import { Controller, Get } from '@nestjs/common';
import { LangchainService } from './ai/langchain.service';

@Controller()
export class AppController {
  constructor(private readonly langchainService:LangchainService) {}

  @Get('healthcheck')
  getHello() {
    return {
      status: 'UP'
    }
  }

  @Get('test')
  test(){
    return this.langchainService.answerQuestion('Ayúdame generándome una respuesta de cómo ahorrar')
  }
}

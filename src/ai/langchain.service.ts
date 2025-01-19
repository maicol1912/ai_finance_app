import { Injectable } from '@nestjs/common';
import { HfInference } from '@huggingface/inference';
import { EnvConfig } from 'src/config/env.schema';

@Injectable()
export class LangchainService {
  private hf: HfInference;

  constructor() {
    this.hf = new HfInference(EnvConfig.HUGGINGFACE_API_KEY);
  }
  async answerQuestion(question: string): Promise<any> {
    try {
        // Inicializar el cliente con tu token
        const client = new HfInference(process.env.HUGGING_FACE_TOKEN);
        
        let fullResponse = "";
        
        const stream = await client.chatCompletionStream({
            model: "Qwen/Qwen2.5-72B-Instruct",
            messages: [
                { role: "user", content: question },
                { role: "assistant", content: "" }  // Inicio vacío para el asistente
            ],
            temperature: 0.5,
            max_tokens: 2048,
            top_p: 0.7
        });

        // Manejar el stream de respuestas
        for await (const chunk of stream) {
            if (chunk.choices && chunk.choices.length > 0) {
                const newContent = chunk.choices[0].delta.content;
                fullResponse += newContent;
                
                // Aquí puedes manejar cada parte de la respuesta
                // Por ejemplo, actualizar UI en tiempo real
                console.log(newContent);
            }
        }

        return fullResponse;
    } catch (error) {
        console.error("Error en la llamada a Hugging Face:", error);
        throw error;
    }
  }
}
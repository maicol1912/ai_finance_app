import { Injectable } from '@nestjs/common';
import { HfInference } from '@huggingface/inference';
import { EnvConfig } from '@app/config/env.schema.config';
import { Observable } from 'rxjs';

@Injectable()
export class HuggingFaceService {
  private hf: HfInference;

  constructor() {
    this.hf = new HfInference(EnvConfig.HUGGINGFACE_API_KEY);
  }

  // 1. Generacion de texto creativo
  async generateText(prompt: string): Promise<string> {
    try {
      const response = await this.hf.textGeneration({
        model: "gpt2", // O cualquier otro modelo de generación de texto
        inputs: prompt,
        parameters: {
          max_new_tokens: 250,
          temperature: 0.7
        }
      });
      return response.generated_text;
    } catch (error) {
      console.error("Error en text generation:", error);
      throw error;
    }
  }

  // 2. Chat Completion - Para conversaciones interactivas generacion de texto completo
  async staticChat(question: string): Promise<any> {
    try {
        
        let fullResponse = "";
        
        const stream = await this.hf.chatCompletionStream({
            model: "Qwen/Qwen2.5-72B-Instruct",
            messages: [
                { role: "user", content: question },
                { role: "assistant", content: "" }
            ],
            temperature: 0.5,
            max_tokens: 2048,
            top_p: 0.7 
        });

        for await (const chunk of stream) {
            if (chunk.choices && chunk.choices.length > 0) {
                const newContent = chunk.choices[0].delta.content;
                fullResponse += newContent;
                
                console.log(newContent);
            }
        }

        return fullResponse;
    } catch (error) {
        console.error("Error en la llamada a Hugging Face:", error);
        throw error;
    }
  }

  // 3. Question Answering - Para respuestas específicas basadas en contexto
  async answerQuestion(question: string, context: string): Promise<string> {
    try {
      const response = await this.hf.questionAnswering({
        model: "deepset/roberta-base-squad2",
        inputs: {
          question: question,
          context: context
        }
      });
      return response.answer;
    } catch (error) {
      console.error("Error en question answering:", error);
      throw error;
    }
  }

  async streamChat(question: string): Promise<Observable<string>> {
    // Retorna un nuevo Observable que manejará el streaming de datos
    return new Observable(subscriber => {
      (async () => {
        try {
          const stream = await this.hf.chatCompletionStream({
            // Especifica el modelo a utilizar
            model: "Qwen/Qwen2.5-72B-Instruct",
            // Array de mensajes para el contexto de la conversación
            messages: [
              { role: "user", content: question },     // Mensaje del usuario
              { role: "assistant", content: "" }       // Respuesta inicial vacía
            ],
            // Controla la aleatoriedad de las respuestas (0-1)
            temperature: 0.5,
            // Número máximo de tokens en la respuesta
            max_tokens: 2048
          });

          // Itera sobre cada fragmento (chunk) del stream
          for await (const chunk of stream) {
            // Verifica si hay contenido nuevo usando optional chaining
            if (chunk.choices?.[0]?.delta?.content) {
              // Emite el nuevo fragmento de texto al suscriptor
              subscriber.next(chunk.choices[0].delta.content);
            }
          }

          // Indica que el stream ha terminado
          subscriber.complete();
        } catch (error) {
          // Si ocurre algún error, lo emite al suscriptor
          subscriber.error(error);
        }
      })();
    });
  }
}
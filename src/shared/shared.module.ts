import { Global, Module } from "@nestjs/common";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { GlobalExceptionHandler } from "./api/exceptions/exception.handler";
import { GlobalResponseInterceptor } from "./api/interceptors/response.interceptor";

@Global()
@Module({
  imports: [],
  providers: [
    {
        provide: APP_FILTER,
        useClass: GlobalExceptionHandler
    },
    {
        provide: APP_INTERCEPTOR,
        useClass: GlobalResponseInterceptor
    },
  ],
  exports: [],
})
export class SharedModule {}
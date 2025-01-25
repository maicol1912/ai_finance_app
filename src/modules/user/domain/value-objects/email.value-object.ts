import { ExceptionResponse } from "@app/shared/api/exceptions/classes/exception.response";
import { HttpStatus } from "@nestjs/common";

export class EmailValueObject {
    private readonly email: string;
  
    constructor(email: string) {
      if (!this.validateEmail(email)) {
        throw new ExceptionResponse('Invalid email address',HttpStatus.BAD_REQUEST);
      }
      this.email = email;
    }

    get value(): string {
      return this.email;
    }
  
    private validateEmail(email: string): boolean {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
  
    equals(other: EmailValueObject): boolean {
      return this.email.toUpperCase() === other.value.toUpperCase();
    }
  }
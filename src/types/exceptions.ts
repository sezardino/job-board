type ExceptionArgs = {
  message: string;
  code: number;
  type?: string;
};

export class CustomException {
  message: string;
  type?: string;
  code: number;

  constructor({ message, code, type }: ExceptionArgs) {
    this.message = message;
    this.code = code;
    this.type = type;
  }
}

export class NotFoundException extends CustomException {
  constructor(message: string, type?: string) {
    super({ message, type, code: 404 });
  }
}

export class NotAllowedException extends CustomException {
  constructor(message: string, type?: string) {
    super({ message, type, code: 405 });
  }
}

export class BadRequestException extends CustomException {
  constructor(message: string, type?: string) {
    super({ message, type, code: 400 });
  }
}

export const isCustomException = (obj: any): obj is CustomException => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.message === "string" &&
    typeof obj.code === "number"
  );
};

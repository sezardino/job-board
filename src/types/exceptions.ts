export class CustomException {
  message: string;
  code: number;

  constructor({ message, code }: { message: string; code: number }) {
    this.message = message;
    this.code = code;
  }
}

export class NotFoundException extends CustomException {
  constructor(message: string) {
    super({ message, code: 404 });
  }
}

export class NotAllowedException extends CustomException {
  constructor(message: string) {
    super({ message, code: 405 });
  }
}

export class BadRequestException extends CustomException {
  constructor(message: string) {
    super({ message, code: 400 });
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

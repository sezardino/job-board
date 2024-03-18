export class BllError {
  message: string;
  code: number;

  constructor({ message, code }: { message: string; code: number }) {
    this.message = message;
    this.code = code;
  }
}

export class NotFoundBllError extends BllError {
  constructor(message: string) {
    super({ message, code: 404 });
  }
}

export class NotAllowedBllError extends BllError {
  constructor(message: string) {
    super({ message, code: 405 });
  }
}

export const isBllError = (obj: any): obj is BllError => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.message === "string" &&
    typeof obj.code === "number"
  );
};

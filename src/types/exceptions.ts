type CustomExceptionArgs<Payload extends any> = {
  message: string;
  code: number;
  payload?: Payload;
};

type ExceptionArgs<Payload extends any> = Pick<
  CustomExceptionArgs<Payload>,
  "message" | "payload"
>;

export class CustomException<Payload extends any = undefined> {
  message: string;
  code: number;
  payload?: Payload;

  constructor({ message, code, payload }: CustomExceptionArgs<Payload>) {
    this.message = message;
    this.code = code;
    this.payload = payload;
  }
}

export class NotFoundException<
  Payload extends any
> extends CustomException<Payload> {
  constructor(args: string | ExceptionArgs<Payload>) {
    typeof args === "string"
      ? super({ message: args, code: 404 })
      : super({ ...args, code: 404 });
  }
}

export class NotAllowedException<
  Payload extends any
> extends CustomException<Payload> {
  constructor(args: string | ExceptionArgs<Payload>) {
    typeof args === "string"
      ? super({ message: args, code: 405 })
      : super({ ...args, code: 405 });
  }
}

export class BadRequestException<
  Payload extends any
> extends CustomException<Payload> {
  constructor(args: string | ExceptionArgs<Payload>) {
    typeof args === "string"
      ? super({ message: args, code: 400 })
      : super({ ...args, code: 400 });
  }
}

export const isCustomException = (obj: any): obj is CustomException<any> => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.message === "string" &&
    typeof obj.code === "number"
  );
};

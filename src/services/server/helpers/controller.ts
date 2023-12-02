import { getNextAuthSession } from "@/libs/next-auth";
import { UserRoles } from "@prisma/client";
import { NextResponse } from "next/server";
import { ZodIssue, ZodSchema } from "zod";

type HelperProps<Schema extends ZodSchema> = {
  data?: any;
  schema?: Schema;
  acceptedRoles?: UserRoles[];
};

export abstract class AbstractController<S> {
  constructor(protected readonly service: S) {}

  protected formatParams(params: IterableIterator<[string, string]>) {
    let formattedParams: Record<string, any> = {};

    Array.from(params).forEach(([k, v]) => {
      formattedParams[k] = v;
    });

    return formattedParams;
  }

  protected getNextResponse<T extends object>(response: T, status: number) {
    return NextResponse.json({ ...response }, { status });
  }

  protected validateParams<Schema extends ZodSchema>(
    data: any,
    schema: Schema
  ): NextResponse<{ message: string; errors: ZodIssue[] }> | Schema["_output"] {
    const validation = schema.safeParse(data);
    if (!validation.success) {
      return this.getNextResponse(
        {
          message: "backend-errors.bad-payload",
          errors: validation.error.errors,
        },
        400
      );
    }

    return validation.data;
  }

  protected async handlerHelper<Schema extends ZodSchema>(
    props: HelperProps<Schema>
  ) {
    const { data, schema, acceptedRoles = [] } = props;
    const session = await getNextAuthSession();

    if (acceptedRoles.length > 0 && !session)
      return {
        response: this.getNextResponse(
          { message: "backend-errors.unauthorized" },
          401
        ),
      };

    if (
      acceptedRoles.length > 0 &&
      session &&
      !acceptedRoles.includes(session?.user?.role)
    )
      return {
        response: this.getNextResponse(
          { message: "backend-errors.forbidden" },
          403
        ),
      };

    const validationResponse =
      data && schema ? this.validateParams(data, schema) : null;

    if (validationResponse instanceof NextResponse)
      return { response: validationResponse };

    return { session, dto: validationResponse, response: null };
  }
}

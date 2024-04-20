import { getNextAuthSession } from "@/libs/next-auth";
import { isCustomException } from "@/types";
import { UserRoles } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodError, ZodSchema } from "zod";

export const formatUrlSearchParams = <T extends Record<string, any>>(
  params: URLSearchParams
): T => {
  let formattedParams: Record<string, any> = {};

  params.forEach((value, key) => {
    if (key.includes("[]")) {
      const keyWithoutBrackets = key.replace("[]", "");
      if (!formattedParams[keyWithoutBrackets])
        formattedParams[keyWithoutBrackets] = [];
      formattedParams[keyWithoutBrackets].push(value);

      return;
    }

    formattedParams[key] = value;
  });

  return formattedParams as T;
};

export const formatFormData = (formData: FormData) => {
  let returned: Record<string, any> = {};

  formData.forEach((value, key) => {
    if (key.includes("[]")) {
      const keyWithoutBrackets = key.replace("[]", "");
      if (!returned[keyWithoutBrackets]) returned[keyWithoutBrackets] = [];
      returned[keyWithoutBrackets].push(value);

      return;
    }

    returned[key] = value;
  });

  return returned;
};

type Args<Schema extends ZodSchema> = {
  schema?: Schema;
  handler: Function;
  role?: UserRoles[] | "public-only" | "logged-in";
  input?: "body" | "search" | "params" | "formData";
};

export const withValidation = <Schema extends ZodSchema>(
  args: Args<Schema>
) => {
  const { schema, handler, role, input = "body" } = args;

  return async (req: NextRequest, params: any) => {
    const session = await getNextAuthSession();

    if (Array.isArray(role)) {
      if (role && !session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      if (role && !role?.includes(session?.user.role!)) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
    }

    if (role === "public-only" && session) {
      return NextResponse.json(
        { message: "Not acceptable for authorized users" },
        { status: 400 }
      );
    }

    if (role === "logged-in" && !session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!schema) return handler(req, params);

    try {
      let data;

      if (input === "body") data = await req.clone().json();
      if (input === "params") data = params.params;
      if (input === "search")
        data = formatUrlSearchParams(req.nextUrl.searchParams);
      if (input === "formData")
        data = formatFormData(await req.clone().formData());

      await schema.parseAsync(data);

      return handler(req, params);
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json(
          { message: "Invalid request", error },
          { status: 422 }
        );
      }
      console.log(error);
      return NextResponse.json(
        { message: "Invalid request", error },
        { status: 500 }
      );
    }
  };
};

export const withApiRouteHandler = (
  handler: (req: NextRequest, params: any) => Promise<any>,
  errorMessage: string
) => {
  return async (req: NextRequest, params: any) => {
    try {
      return await handler(req, params);
    } catch (error) {
      if (isCustomException(error)) {
        const { code, message } = error;
        return NextResponse.json({ message }, { status: code });
      }

      console.log(error);
      return NextResponse.json(
        { message: errorMessage, error },
        { status: 500 }
      );
    }
  };
};

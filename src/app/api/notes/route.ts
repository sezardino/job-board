import { withApiRouteHandler, withValidation } from "@/app/api/utils";
import { CompanyRoles } from "@/const";
import { createNoteRequestSchema } from "@/services/bll/modules/notes/schema";
import { postCreateNote } from "./post";

export const POST = withValidation({
  handler: withApiRouteHandler(postCreateNote, "Cant add note to application"),
  schema: createNoteRequestSchema,
  role: CompanyRoles,
});

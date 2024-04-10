import { withApiRouteHandler, withValidation } from "@/app/api/utils";
import { createNoteRequestSchema } from "@/services/bll/modules/notes/schema";
import { UserRoles } from "@prisma/client";
import { postCreateNote } from "./post";

export const POST = withValidation({
  handler: withApiRouteHandler(postCreateNote, "Cant add note to application"),
  role: [UserRoles.OWNER, UserRoles.MODERATOR, UserRoles.RECRUITER],
  schema: createNoteRequestSchema,
});

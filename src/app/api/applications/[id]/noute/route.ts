import { withApiRouteHandler, withValidation } from "@/app/api/utils";
import { addApplicationNoteRequestSchema } from "@/services/bll/modules/application/schema";
import { UserRoles } from "@prisma/client";
import { putAddApplicationNote } from "./put";

export const PUT = withValidation({
  handler: withApiRouteHandler(
    putAddApplicationNote,
    "Cant add note to application"
  ),
  role: [UserRoles.OWNER, UserRoles.MODERATOR, UserRoles.RECRUITER],
  schema: addApplicationNoteRequestSchema,
});

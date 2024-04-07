import { addJobApplicationNoteRequestSchema } from "@/services/bll/modules/job-application/schema";
import { UserRoles } from "@prisma/client";
import { putAddApplicationNote } from "./put";
import { withValidation, withApiRouteHandler } from "@/app/api/utils";

export const PUT = withValidation({
  handler: withApiRouteHandler(
    putAddApplicationNote,
    "Cant add note to application"
  ),
  role: [UserRoles.OWNER, UserRoles.MODERATOR, UserRoles.RECRUITER],
  schema: addJobApplicationNoteRequestSchema,
});

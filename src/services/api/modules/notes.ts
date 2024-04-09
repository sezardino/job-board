import {
  CreateNoteRequest,
  createNoteResponseSchema,
} from "@/services/bll/modules/notes/schema";
import { AbstractApiModule } from "../helpers";

export class NotesApiModule extends AbstractApiModule {
  async create(data: CreateNoteRequest) {
    return this.fetch({
      endpoint: "notes",
      config: { method: "POST", data },
      schema: createNoteResponseSchema,
    });
  }
}

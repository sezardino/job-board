import { AbstractController } from "@/services/server/helpers";
import { NextRequest } from "next/server";
import { FilesService } from "./files.service";

export class FilesController extends AbstractController<FilesService> {
  async upload(req: NextRequest) {
    // const data = await req.formData();
    // const file: File | null = data.get("file") as unknown as File;

    // if (!file) {
    //   return NextResponse.json({ success: false });
    // }
    try {
      // const response = await this.service.uploadFile(file);

      // if (!response) {
      //   return this.getNextResponse({ message: "error-1" }, 500);
      // }

      return this.getNextResponse({ success: true }, 201);
    } catch (error) {
      console.log(error);
      return this.getNextResponse({ message: "error" }, 500);
    }
  }
}

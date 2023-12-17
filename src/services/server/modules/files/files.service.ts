import { uploadFile } from "@/libs/firebase/storage";
import { AbstractService } from "@/services/server/helpers";

export class FilesService extends AbstractService {
  async uploadImage(file: File) {
    const imageData = await uploadFile("images", file);

    if (!imageData) {
      return Promise.reject("Error when try to upload image");
    }

    return this.prismaService.image.create({
      data: {
        name: imageData.fileName,
        url: imageData.publicUrl,
      },
    });
  }
}

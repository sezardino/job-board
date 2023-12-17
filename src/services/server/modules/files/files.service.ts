import { uploadFile } from "@/libs/firebase/storage";
import { AbstractService } from "@/services/server/helpers";

export class FilesService extends AbstractService {
  async uploadImage(file: File, companyId: string) {
    const imageData = await uploadFile(`${companyId}/images`, file);

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

  async uploadCV(file: File, companyId: string) {
    const imageData = await uploadFile(`${companyId}/cv`, file);

    if (!imageData) {
      return Promise.reject("Error when try to upload CV");
    }

    return this.prismaService.curriculumVitae.create({
      data: {
        name: imageData.fileName,
        url: imageData.publicUrl,
      },
    });
  }
}

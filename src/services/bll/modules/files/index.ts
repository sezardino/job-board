import { uploadFile } from "@/libs/firebase/storage";
import { FileEntity } from "@/types";
import { AbstractBllService } from "../../module.abstract";

export class FilesBllModule extends AbstractBllService {
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

  async uploadImages(files: File[], companyId: string) {
    const uploadedImages: FileEntity[] = [];

    await Promise.all(
      files.map(async (file) => {
        try {
          const imageData = await this.uploadImage(file, `${companyId}/images`);

          uploadedImages.push(imageData);
          Promise.resolve();
        } catch (error) {
          Promise.reject(error);
        }
      })
    );

    return uploadedImages;
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

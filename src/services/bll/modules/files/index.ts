import { uploadFile } from "@/libs/firebase/storage";
import { FileEntity } from "@/types";
import { AbstractBllService } from "../../module.abstract";

type FileTypes = "user-avatar" | "company-image" | "company-cv" | "user-cv";

type UploadFileArgs = {
  file: File;
  type: FileTypes;
  id: string;
};

type UploadImageArgs = {
  file: File;
  type: Extract<FileTypes, "user-avatar" | "company-image">;
  id: string;
};

const FilePaths: Record<FileTypes, (id: string) => string> = {
  "company-image": (id: string) => `company/${id}/images`,
  "company-cv": (id: string) => `company/${id}/cv`,
  "user-avatar": (id: string) => `user/${id}`,
  "user-cv": (id: string) => `user/${id}/cv`,
};

export class FilesBllModule extends AbstractBllService {
  async uploadImage(args: UploadImageArgs) {
    const imageData = await this.uploadFile(args);

    return this.prismaService.image.create({
      data: {
        name: imageData.fileName,
        url: imageData.publicUrl,
      },
    });
  }

  async uploadUserImage(file: File, userId: string) {
    const imageData = await this.uploadFile({
      file,
      type: "user-avatar",
      id: userId,
    });

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
          const imageData = await this.uploadImage({
            file,
            type: "company-image",
            id: companyId,
          });

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
    const cv = await this.uploadFile({
      file,
      type: "company-cv",
      id: companyId,
    });

    return this.prismaService.curriculumVitae.create({
      data: {
        name: cv.fileName,
        url: cv.publicUrl,
      },
    });
  }

  private async uploadFile(args: UploadFileArgs) {
    const { file, type, id } = args;
    const path = FilePaths[type](id);

    const fileData = await uploadFile(path, file);

    if (!fileData) {
      return Promise.reject("Error when try to upload file");
    }

    return fileData;
  }
}

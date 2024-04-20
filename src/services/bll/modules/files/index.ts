import { deleteFile, uploadFile } from "@/libs/firebase/storage";
import { BadRequestException, FileEntity, NotFoundException } from "@/types";
import { AbstractBllService } from "../../module.abstract";

type FileTypes = "user-avatar" | "company-image" | "company-cv" | "user-cv";

type DeleteFileArgs = {
  type: FileTypes;
  id: string;
};

type UploadFileArgs = {
  file: File;
  type: FileTypes;
  id: string;
  idToDelete?: string;
};

type UploadImageArgs = Pick<UploadFileArgs, "file" | "id" | "idToDelete"> & {
  type: Extract<FileTypes, "user-avatar" | "company-image">;
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
    const { file, type, id, idToDelete } = args;

    if (idToDelete) this.deleteFile({ type, id: idToDelete });

    const path = FilePaths[type](id);

    const fileData = await uploadFile(path, file);

    if (!fileData) {
      return Promise.reject("Error when try to upload file");
    }

    return fileData;
  }

  async deleteFile(args: DeleteFileArgs) {
    const { type, id } = args;

    switch (type) {
      case "company-image":
      case "user-avatar":
        const image = await this.prismaService.image.findUnique({
          where: { id },
          select: { url: true },
        });

        if (!image) throw new NotFoundException("Image not found");

        try {
          await deleteFile(image.url);

          this.prismaService.image.delete({ where: { id } });
        } catch (error) {
          throw new BadRequestException("Error when try to delete file");
        }

        break;
      case "company-cv":
      case "user-cv":
        const cv = await this.prismaService.curriculumVitae.findUnique({
          where: { id },
          select: { url: true },
        });

        if (!cv) throw new NotFoundException("CV not found");

        try {
          await deleteFile(cv.url);

          this.prismaService.image.delete({ where: { id } });
        } catch (error) {
          throw new BadRequestException("Error when try to delete file");
        }
        break;
      default:
        throw new BadRequestException("Invalid file type");
    }
  }
}

import { AbstractService } from "@/services/server/helpers";

export class FilesService extends AbstractService {
  async uploadFile(file: File) {
    console.log(this.prismaService);
    // const uploadedFileData = await uploadFile("tmp", file);
    // console.log(uploadedFileData);

    // if (!uploadedFileData) {
    //   return null;
    // }
    return null;

    // return this.prismaService.file.create({
    //   data: {
    //     name: uploadedFileData.fileName,
    //     mimeType: file.type,
    //     url: uploadedFileData.publicUrl,
    //   },
    // });
  }
}

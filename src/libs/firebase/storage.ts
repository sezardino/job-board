import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { firebaseStorage } from "./index";

export const uploadFile = async (pathToFile: string, file: File) => {
  const filePath = `${pathToFile}/${crypto.randomUUID()}`;
  const fileRef = ref(firebaseStorage, filePath);

  try {
    await uploadBytesResumable(fileRef, file);

    const publicUrl = await getDownloadURL(fileRef);

    return { publicUrl, fileName: file.name };
  } catch (error) {
    console.log(error);
  }
};

export const deleteFile = async (pathToFile: string) => {
  const fileRef = ref(firebaseStorage, pathToFile);

  try {
    await deleteObject(fileRef);
  } catch (error) {
    console.log(error);
  }
};

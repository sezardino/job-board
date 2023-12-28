import { getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { firebaseConfig } from "./config";

export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const firebaseStorage = getStorage(firebaseApp);

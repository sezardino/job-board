"use client";

import { apiService } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";

const useUploadFileMutation = () =>
  useMutation({
    mutationFn: (file: File) => apiService.companies.upload(file),
  });

const CompanyHomePage = () => {
  const [file, setFile] = useState<File | null>(null);

  const { mutateAsync } = useUploadFileMutation();

  const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const files = evt.currentTarget.files;
    if (!files) return;

    setFile(files[0]);
  };

  const uploadHandler = async () => {
    if (!file) return;

    await mutateAsync(file);
  };

  return (
    <main>
      <h1>Company</h1>
      {JSON.stringify(file)}

      <input type="file" onChange={changeHandler} />
      <button onClick={uploadHandler}>upload</button>
    </main>
  );
};

export default CompanyHomePage;

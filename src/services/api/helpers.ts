import { BackendErrorResponse } from "@/types";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Schema, z } from "zod";

type FetchProps<T extends z.Schema> = {
  endpoint: string;
  config?: AxiosRequestConfig;
  schema: T;
};

export abstract class AbstractApiModule {
  protected restUrl: string;

  constructor() {
    this.restUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api`;
  }

  protected async fetch<T extends z.Schema>(
    props: FetchProps<T>
  ): Promise<z.infer<T>> {
    const { endpoint, config, schema } = props;

    return axios<
      AxiosError<BackendErrorResponse>,
      AxiosResponse<z.infer<Schema>>
    >(`${this.restUrl}/${endpoint}`, { ...config }).then((res) => {
      const validationResponse = schema.safeParse(res.data);

      if (!validationResponse.success) {
        console.error(validationResponse.error);
        throw new Error(validationResponse.error.message);
      }

      return validationResponse.data;
    });
  }
}

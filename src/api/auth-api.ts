import { AxiosResponse } from "axios";
import { instance } from "./instance";
import { ResponseType } from "./api-types/api-types";

export type LoginType = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: string;
};

export type userType = {
  id: number;
  email: string;
  login: string;
};

export const authApi = {
  login: (data: LoginType) => {
    return instance.post<
      LoginType,
      AxiosResponse<ResponseType<{ userId: number }>>
    >(`/auth/login`, data);
  },

  me: () => {
    return instance.get<ResponseType<userType>>(`/auth/me`);
  },
};

import { http } from "./http";

interface LoginDto {
  name: string;
  password: string;
}

export interface UserInfo {
  userId: string;
  username: string;
}

interface LoginVo {
  token: string;
  user: UserInfo;
}

export async function fetchLogin(dto: LoginDto) {
  return await http.post<LoginVo, LoginVo>("/auth/login", dto);
}

export async function fetchSignUp(dto: LoginDto) {
  return await http.post<LoginVo, LoginVo>("/auth/signup", dto);
}

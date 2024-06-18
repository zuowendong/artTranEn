import { http } from "./http";

export async function fetchUploadOss() {
  return await http.get("oss/signature");
}

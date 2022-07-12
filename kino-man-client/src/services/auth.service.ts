import { request } from "@/helpers/request";
import { serverUrl } from "@/app.constants";

const resource = "auth";

export async function loginUser(
  email: string,
  password: string
): Promise<void> {
  const endpoint = serverUrl + "/" + resource + "/login";

  return request({
    url: endpoint,
    method: "POST",
    body: {
      email,
      password,
    },
  });
}

export async function registerUser(
  email: string,
  name: string,
  password: string
): Promise<{ email: string; token: string }> {
  const endpoint = serverUrl + "/" + resource + "/register";

  return request({
    url: endpoint,
    method: "POST",
    body: {
      email,
      name,
      password,
    },
  });
}

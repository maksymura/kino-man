import { composeBearerTokenAuthHeaders, request } from "@/helpers/request";
import { serverUrl } from "@/app.constants";
import { getAuthStore } from "@/stores";

const resource = "time";

export async function getServerTime(): Promise<string> {
  const endpoint = serverUrl + "/" + resource + "/now";

  const authStore = getAuthStore();

  return request({
    url: endpoint,
    method: "GET",
    headers: composeBearerTokenAuthHeaders(authStore.jwtToken),
  });
}

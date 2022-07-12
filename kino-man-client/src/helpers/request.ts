export type Method = "GET" | "POST";

export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function composeBearerTokenAuthHeaders(token: string) {
  return {
    Authorization: "Bearer " + token,
  };
}

export async function request({
  url,
  method,
  body,
  headers,
}: {
  url: string;
  method: Method;
  body?: Record<string, unknown>;
  headers?: Record<string, unknown>;
}) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...(body && { body: JSON.stringify(body) }),
  };

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    throw new ApiError(json.message, json.statusCode);
  }

  return json;
}

const API_URLS = {
  login: "/api/auth/login",
  register: "/api/auth/register",
};

export interface FetchOptions {
  method?: "GET" | "POST";
  headers?: Record<string, string>;
  body?: string | undefined;
  token?: string;
}

export const fetchModule = async (
  urlKey: keyof typeof API_URLS,
  { method = "GET", headers = {}, body, token }: FetchOptions
) => {
  const url = API_URLS[urlKey];

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error("API 요청 중 오류 발생: ", error);
    throw error;
  }
};

import Cookies from "js-cookie";

const API_URLS = {
  login: "/api/auth/login",
  register: "/api/auth/register",
  writePost: "/api/posts/write",
};

export interface FetchOptions {
  method?: "GET" | "POST";
  headers?: Record<string, string>;
  body?: Record<string, any>;
}

export const fetchModule = async (
  urlKey: keyof typeof API_URLS,
  { method = "GET", headers = {}, body }: FetchOptions
) => {
  const url = API_URLS[urlKey];
  const token = Cookies.get("token");
  console.log("Token from cookies:", token);
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

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API 응답 데이터:", errorData);
      alert(`오류 발생: ${errorData.message}`);
      throw new Error(errorData.message || "요청 실패");
    }

    const data = await response.json();

    if (url.includes("login") && data.token) {
      Cookies.set("token", data.token);
    }

    return data;
  } catch (error) {
    console.error("API 요청 중 오류 발생: ", error);
    throw error;
  }
};

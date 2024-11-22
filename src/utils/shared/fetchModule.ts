import Cookies from "js-cookie";

const API_URLS = {
  login: "/api/auth/login",
  register: "/api/auth/register",
  writePost: "/api/posts/write",
  listPost: "api/posts",
};

export interface FetchOptions {
  method?: "GET" | "POST";
  headers?: Record<string, string>;
  body?: FormData | string | null | Record<string, string>;
}

export const fetchModule = async (
  urlKey: keyof typeof API_URLS,
  { method = "GET", headers = {}, body }: FetchOptions
) => {
  let url = API_URLS[urlKey];
  const token = Cookies.get("token");

  const defaultHeaders: Record<string, string> = {
    ...headers,
  };

  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const isFormData = body instanceof FormData;

  if (!isFormData) {
    defaultHeaders["Content-Type"] = "application/json";
  }

  // GET 요청일 때 쿼리 파라미터를 URL에 추가
  if (method === "GET" && body && typeof body === "object") {
    const queryParams = new URLSearchParams(body as Record<string, string>);
    url += `?${queryParams.toString()}`;
  }

  try {
    const response = await fetch(url, {
      method,
      headers: defaultHeaders,
      body:
        method !== "GET"
          ? isFormData
            ? (body as FormData)
            : JSON.stringify(body)
          : undefined,
      credentials: "include",
    });

    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");

    if (!response.ok) {
      if (isJson) {
        const errorData = await response.json();
        alert(`오류 발생: ${errorData.message}`);
        throw new Error(errorData.message || "요청 실패");
      } else {
        throw new Error("서버 오류: JSON 응답이 아님");
      }
    }

    return isJson ? await response.json() : null;
  } catch (error) {
    console.error("API 요청 중 오류 발생: ", error);
    throw error;
  }
};

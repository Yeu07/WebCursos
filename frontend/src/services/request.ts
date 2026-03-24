import { RequestInit } from "next/dist/server/web/spec-extension/request";
import { API_BASE_URL, HTTP_STATUS } from "./constants";

interface RequestOptions extends RequestInit {
  headers?: {
    "Content-Type"?: string;
    Authorization?: string;
  };
  timeout?: number;
}
export interface RequestResult<T> {
  ok: boolean;
  data: T | null;
  message?: string;
  status: number;
}

const request = async <T>(
  url: string,
  params: RequestOptions = {},
  defaultReturn: T | null = null,
): Promise<RequestResult<T>> => {
  try {
    const isServerSide = typeof window === "undefined";
    const token = isServerSide ? null : localStorage.getItem("jwt");
    params.headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(params.headers || {}),
    };
    params.mode = "cors";
    const res = await fetch(`${API_BASE_URL}${url}`, params);

    // ← parseo seguro, por si el backend no devuelve JSON en errores como 401
    let data = null;
    let message = undefined;
    try {
      const json = await res.json();
      data = json.data;
      message = json.message;
    } catch {
      // respuesta vacía o no JSON
    }

    if (res.status !== HTTP_STATUS.ok && res.status !== HTTP_STATUS.created)
      return { ok: false, data, status: res.status, message };

    return { ok: true, data, status: HTTP_STATUS.ok, message };
  } catch {
    return {
      ok: false,
      data: defaultReturn,
      status: HTTP_STATUS.internalServerError,
    };
  }
};
export default request;
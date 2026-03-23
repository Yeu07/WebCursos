const API_BASE_URL = !!process.env.VERCEL_ENV ? process.env.NEXT_PUBLIC_BASE_BACKEND_URL : process.env.NEXT_PUBLIC_API;  
const HTTP_STATUS = {
  ok: 200,
  created: 201,
  found: 302,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  methodNotAllowed: 405,
  timeout: 408,
  conflict: 409,
  internalServerError: 500,
};

export { API_BASE_URL, HTTP_STATUS };
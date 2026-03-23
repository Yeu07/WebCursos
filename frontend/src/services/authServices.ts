import request from "./request";
import { API_BASE_URL } from "./constants";

export const getAuth = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
}

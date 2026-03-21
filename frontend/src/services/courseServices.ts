import request from "./request";
import Course from "../types/Course";

export const getCourses = () => {
    return request<Course[]>(`/cursos`)
}
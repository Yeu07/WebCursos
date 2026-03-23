import request from "./request";
import Course from "../types/Course";

export const getCourses = () => {
    return request<Course[]>(`/cursos`)
}

export const getCourseById = (id: string) => {
  return request<Course>(`/cursos/${id}`);
};
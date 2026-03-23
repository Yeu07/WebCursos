import CourseList from "./CourseList";
import { getCourses } from "@/src/services/courseServices";
import Course from "@/src/types/Course";

export default async function Inicio() {
  let courses: Course[] = [];

  try {
    const response = await getCourses();
    if (!response?.data) throw new Error("No se recibieron datos");
    courses = response.data;
  } catch (e) {
    console.error("[Inicio] Error:", e);
  }

  return <CourseList initialCourses={courses} />;
}
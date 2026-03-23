import { getCourseById } from "@/src/services/courseServices";

interface CoursePageProps {
  params: Promise<{ id: string }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params; 

  let course = null;

  try {
    const response = await getCourseById(id);
    if (!response?.data) throw new Error("Curso no encontrado");
    course = response.data;
  } catch (e) {
    console.error("[CoursePage] Error:", e);
  }

  if (!course) {
    return <p className="text-red-500 p-10">No se pudo cargar el curso.</p>;
  }

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold">{course.name}</h1>
      <p className="text-gray-400">{course.description}</p>
    </div>
  );
}
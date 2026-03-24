import CourseDetail from "./CourseDetail";

interface CoursePageProps {
  params: Promise<{ id: string }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  return <CourseDetail id={id} />;
}
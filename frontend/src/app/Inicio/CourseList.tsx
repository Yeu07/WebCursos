'use client'
import { useState } from "react";
import CourseCard from "@/src/components/CourseCard";
import Course from "@/src/types/Course";

interface Props {
  initialCourses: Course[];
}

export default function CourseList({ initialCourses }: Props) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  return (
    <div>
   
    <h1 className="text-center underline text-3xl font-bold">Cursos</h1>    
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {courses.map((c) => (
          <div key={c._id} className="max-w-md">
            <CourseCard
              course={c}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
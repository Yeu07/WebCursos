'use client'
import { useState, useEffect } from "react";
import CourseCard from "@/src/components/CourseCard";
import Course from "@/src/types/Course";
import { getCourses } from "@/src/services/courseServices";

export default function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    getCourses().then(res => {
      if (res?.data) setCourses(res.data);
    });
  }, []);

  return (
    <div>
      <h1 className="text-center underline text-3xl font-bold mb-10">Cursos</h1>    
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 items-stretch">
        {courses.map((c) => (
          <div key={c._id} className="h-full">
            <CourseCard course={c} />
          </div>
        ))}
      </div>
    </div>
  );
}
'use client'
import { useEffect, useState } from "react";
import CourseCard from "@/src/components/CourseCard";
import { getCourses } from "@/src/services/courseServices";
import Course from "@/src/types/Course";
import Notification from "@/src/utils/notifications";

export default function Inicio() {
  const [courses, setCourses] = useState<Course[]>([]);

  const fetchCourses = async () => {
    try {
        const response = await getCourses()
        const data = response.data

        if(response && data){
            setCourses(data)
        }
    } catch (error) {
        Notification({message: "Error obteniendo cursos", type:"error"})
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <h1 className="text-center underline text-3xl font-bold mb-5">Cursos</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {courses.map((c) => (
        <div key={c._id} className="max-w-md"> 
          <CourseCard 
            _id={c._id} 
            name={c.name} 
            thumbnail={c.thumbnail} 
            description={c.description}
          />
        </div>
      ))}
    </div>
    </div>
    
  );
}
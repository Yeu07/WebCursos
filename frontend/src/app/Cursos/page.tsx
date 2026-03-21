'use client'
import { getCourses } from "@/src/services/courseServices";
import Course from "@/src/types/Course";
import Notification from "@/src/utils/notifications";
import { useEffect, useState } from "react";


export default function Cursos() {
  const [course, setCourse] = useState<Course[]>([]);

  const fetchCourses = async () => {
    try {
        const response = await getCourses()
        const data = response.data

        if(response && data){
            setCourse(data)
        }
    } catch (error) {
        Notification({message: "Error obteniendo cursos", type:"error"})
    }
    
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}

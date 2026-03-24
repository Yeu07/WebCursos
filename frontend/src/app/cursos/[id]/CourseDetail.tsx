'use client'
import { useState, useEffect } from "react";
import Course from "@/src/types/Course";
import { getCourseById } from "@/src/services/courseServices";
import CourseHero from "@/src/components/CourseHero";
import CourseSections from "@/src/components/CourseSections";
import { useAuth } from '../../../components/Providers';

interface Props {
  id: string;
}

export default function CourseDetail({ id }: Props) {
  const [course, setCourse] = useState<Course | null>(null);
  const [hasBoughtCourse, setHasBoughtCourse] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    getCourseById(id).then(res => {
      if (res?.data) {
        const { hasBoughtTheCourse, ...courseData } = res.data as any;
        setCourse(courseData);
        setHasBoughtCourse(!!hasBoughtTheCourse);
      }
    });
  }, [id]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-400 text-lg">No se pudo cargar el curso.</p>
      </div>
    );
  }

  const totalVideos = course.sections?.reduce((acc, s) => acc + (s.videos?.length ?? 0), 0) ?? 0;
  const totalDuration = course.sections?.reduce((acc, s) => acc + (s.realDuration ? parseFloat(s.realDuration) : 0), 0) ?? 0;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <CourseHero 
        course={course} 
        totalVideos={totalVideos} 
        totalDuration={totalDuration}
        isAuthenticated={isAuthenticated}     
        hasBoughtCourse={hasBoughtCourse}      
      />
      <CourseSections 
        sections={course.sections ?? []} 
        isAuthenticated={isAuthenticated}
        hasBoughtCourse={hasBoughtCourse}
      />
    </div>
  );
}
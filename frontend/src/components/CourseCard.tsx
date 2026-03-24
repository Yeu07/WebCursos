'use client' 
import { useRouter } from 'next/navigation'; 
import Course from '../types/Course';
import { useAuth } from './Providers';

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleNavigation = () => {
    router.push(`/cursos/${course._id}`);
  };

  return (
    <div 
      onClick={handleNavigation}
      className="group block rounded-xl bg-gray-900 border border-gray-800 p-5 
                 cursor-pointer transition-all duration-300 ease-out
                 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.2)] 
                 hover:-translate-y-2"
    >
      <div className="flex gap-5 items-center">
        <div className="relative h-24 w-40 flex-shrink-0 overflow-hidden rounded-lg">
          <img 
            src={course.thumbnail} 
            alt={`Miniatura del curso ${course.name}`}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="flex-grow">
          <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
            {course.name} 
          </h3>
          <p className="mt-1 text-sm text-gray-400">
            {course.description} 
          </p>
        </div>
      </div>
    </div>
  );
}
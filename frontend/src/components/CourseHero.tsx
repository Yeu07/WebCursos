import { PlayCircle, Clock, BookOpen } from "lucide-react";
import Course from "@/src/types/Course";
import PayPalCheckout from "./PayPalCheckout";

interface Props {
  course: Course;
  totalVideos: number;
  totalDuration: number;
  isAuthenticated: boolean;
  hasBoughtCourse: boolean;
}

export default function CourseHero({ course, totalVideos, totalDuration, isAuthenticated, hasBoughtCourse }: Props) {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-gray-950 to-black border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-10 items-start">
        <div className="flex-1">
          <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-3 block">
            Curso
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">{course.name}</h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">{course.description}</p>

          <div className="flex flex-wrap gap-6 text-sm text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-indigo-400" />
              <span>{course.sections?.length ?? 0} secciones</span>
            </div>
            <div className="flex items-center gap-2">
              <PlayCircle size={16} className="text-indigo-400" />
              <span>{totalVideos} videos</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-indigo-400" />
              <span>{totalDuration.toFixed(0)} min de contenido</span>
            </div>
          </div>

          {/* Precio y acción de compra */}
          <div className="flex items-center gap-4 mb-2">
            <span className="text-4xl font-bold text-white">${course.price}</span>
          </div>

          {hasBoughtCourse ? (
            <div className="flex items-center gap-2 text-green-400 font-semibold mt-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Ya compraste este curso
            </div>
          ) : !isAuthenticated ? (
            <p className="text-gray-400 text-sm mt-2">
              <a href="/login" className="text-indigo-400 hover:underline">Iniciá sesión</a> para comprar este curso
            </p>
          ) : (
            <div className="mt-4 max-w-sm">
              <PayPalCheckout courseId={course._id} price={course.price as string} />
            </div>
          )}
        </div>

        {course.thumbnail && (
          <div className="w-full md:w-80 shrink-0">
            <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-indigo-900/30 border border-gray-800">
              <img src={course.thumbnail} alt={course.name} className="w-full aspect-video object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/20 transition-colors cursor-pointer">
                <PlayCircle size={56} className="text-white/90" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
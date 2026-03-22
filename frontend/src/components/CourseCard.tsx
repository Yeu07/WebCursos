'use client' 
import Link from 'next/link'; 

interface CourseCardProps {
  _id: string; 
  name: string;
  thumbnail: string;
  description: string;
}

export default function CourseCard({ _id, name, thumbnail, description }: CourseCardProps) {
  return (
    <Link 
      href={`/cursos/${_id}`} 
      className="group block rounded-xl bg-gray-900 border border-gray-800 p-5 
                 cursor-pointer
                 
                 transition-all duration-300 ease-out
                 
                 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.2)] 
                 
                 hover:-translate-y-2
                 "
    >
      <div className="flex gap-5 items-center">
        <div className="relative h-24 w-40 flex-shrink-0 overflow-hidden rounded-lg">
          <img 
            src={thumbnail} 
            alt={`Miniatura del curso ${name}`}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" // Un pequeño zoom en la imagen al hacer hover en la tarjeta
          />
        </div>

        <div className="flex-grow">
          <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
            {name} 
          </h3>
          <p className="mt-1 text-sm text-gray-400">
            {description} 
          </p>
        </div>
      </div>
    </Link>
  );
}
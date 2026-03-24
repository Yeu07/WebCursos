'use client'
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import CourseVideoItem from "./CourseVideoItem";

interface Section {
  name: string;
  realDuration: string;
  videos: { title: string; videoUrl: string; duration: string }[];
}

interface Props {
  sections: Section[];
  isAuthenticated: boolean;
  hasBoughtCourse: boolean;
}

export default function CourseSections({ sections, isAuthenticated, hasBoughtCourse }: Props) {
  const [openSection, setOpenSection] = useState<number | null>(0);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-6">Contenido del curso</h2>
      <div className="space-y-3">
        {sections.map((section, i) => (
          <div key={i} className="border border-gray-800 rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenSection(openSection === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 bg-gray-900 hover:bg-gray-800 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-indigo-400 font-bold text-sm">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-semibold">{section.name}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>{section.videos?.length ?? 0} videos</span>
                <span>{section.realDuration} min</span>
                {openSection === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </button>
            {openSection === i && (
              <div className="divide-y divide-gray-800">
                {section.videos?.map((video, j) => (
                  <CourseVideoItem 
                    key={j} 
                    video={video}
                    isAuthenticated={isAuthenticated}
                    hasBoughtCourse={hasBoughtCourse}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
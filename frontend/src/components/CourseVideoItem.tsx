import { PlayCircle, Lock } from "lucide-react";

interface Video {
  title: string;
  videoUrl: string;
  duration: string;
  free?: boolean;
}

interface Props {
  video: Video;
  isAuthenticated: boolean;
  hasBoughtCourse: boolean;
}

export default function CourseVideoItem({ video, isAuthenticated, hasBoughtCourse }: Props) {
  const canWatch = video.free || (isAuthenticated && hasBoughtCourse);

  return (
    <div className="flex items-center justify-between px-5 py-3 bg-gray-950 hover:bg-gray-900 transition-colors group">
      <div className="flex items-center gap-3">
        <PlayCircle
          size={18}
          className={`shrink-0 transition-colors ${canWatch ? 'text-indigo-400' : 'text-gray-600 group-hover:text-gray-400'}`}
        />
        <span className={`text-sm ${canWatch ? 'text-white' : 'text-gray-400'}`}>
          {video.title}
        </span>
        {video.free && (
          <span className="text-xs bg-indigo-900 text-indigo-300 px-2 py-0.5 rounded-full">
            Gratis
          </span>
        )}
      </div>
      <div className="flex items-center gap-3 text-xs text-gray-500">
        <span>{video.duration}</span>
        {canWatch
          ? <a href={video.videoUrl} target="_blank" className="text-indigo-400 hover:text-indigo-300 font-medium">Ver</a>
          : <Lock size={12} />
        }
      </div>
    </div>
  );
}
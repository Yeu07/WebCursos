import { PlayCircle, Lock } from "lucide-react";

interface Video {
  title: string;
  videoUrl: string;
  duration: string;
}

interface Props {
  video: Video;
}

export default function CourseVideoItem({ video }: Props) {
  return (
    <div className="flex items-center justify-between px-5 py-3 bg-gray-950 hover:bg-gray-900 transition-colors group">
      <div className="flex items-center gap-3">
        <PlayCircle size={18} className="text-gray-600 group-hover:text-indigo-400 transition-colors shrink-0" />
        <span className="text-sm text-gray-300">{video.title}</span>
      </div>
      <div className="flex items-center gap-3 text-xs text-gray-500">
        <span>{video.duration}</span>
        <Lock size={12} />
      </div>
    </div>
  );
}
import React from 'react'


type CourseVideoProps = {
    videoUrl:string
}

const CourseVideo: React.FC<CourseVideoProps> = ({videoUrl}) => {
  return (
    <div className="mt-20 rounded-[5px] overflow-hidden h-122 shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
  <video
    src={videoUrl}
    className="w-full h-full"
    autoPlay
    controls
  />
</div>
  )
}

export default CourseVideo

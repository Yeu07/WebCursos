export default interface Course{
    _id:string,
    name: string,
    description:string,
    thumbnail: string,
    price: string,
    sections:[
        {
            name:string,
            recordedAt: string,
            recordingDay: string,
            realDuration:string,
            videos: [{title: string,videoUrl: string,duration: string}]
        }
    ]

}
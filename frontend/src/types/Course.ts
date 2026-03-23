export default interface Course{
    _id:string,
    name: string,
    description:string,
    thumbnail: string,
    videos: [
        {
            title: string,
            videoUrl: string,
            duration: string
        }
    ]

}
import type { Request, Response } from "express";
import Course from "../models/courseModel.js";

class CourseController{
    constructor(){}

    async getCourses(req:Request,res:Response){
        try {
            const courses = await Course.find()
            res.status(200).json({data:courses, message:"Correct"})
        } catch (error) {
            res.status(500).json({message: "Internal Server Error"})
        }
    }

    async createCoursee(req:Request,res:Response){
        const {name,thumbnail,videos, description} = req.body;

        const newCourse = new Course({
            name:name,
            description:description,
            thumbnail:thumbnail,
            videos:videos
        })
        try {
            const savedCourse = await newCourse.save()
            res.status(201).json({savedCourse})
        } catch (error) {
            res.status(500).json({message: "Internal Server Error"})
        }
    }

    async deleteCourse(req:Request, res:Response){
         try {
            const deletedCourse =  await Course.findByIdAndDelete(req.params.id)

            if(!deletedCourse) res.status(404).json({message:"Curso no encontrado"})

            res.status(200).json({message:"Nota Eliminada Correctamente"})
        } catch (error) {

            res.status(500).json({message:"Internal Server Error"})
        }
    }


}

export default new CourseController()
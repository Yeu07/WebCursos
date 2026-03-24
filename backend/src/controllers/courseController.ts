import type { Request, Response } from "express";
import Course from "../models/courseModel.js";
import Sale from "../models/saleModel.js";
import mongoose from "mongoose";
import type { IUser } from '../models/userModel.js';
import console from "node:console";

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

    async getCourseById(req:Request,res:Response){
        const {id} = req.params 
        
        try {
            let hasBoughtTheCourse = null 
            if(!!req.user){
                hasBoughtTheCourse = !!await Sale.exists({
                    course: new mongoose.Types.ObjectId(id as string),
                    user: new mongoose.Types.ObjectId((req.user as IUser)._id)
                });
            }
            const course = await Course.findById(id)
            res.status(200).json({data:{...course?.toObject(), hasBoughtTheCourse}, message:"Correct"})
        } catch (error) {
            res.status(500).json({message: "Internal Server Error"})
        }
    }

    async createCoursee(req:Request,res:Response){
        const {name,thumbnail, description, price, sections} = req.body;

        const newCourse = new Course({
            name:name,
            description:description,
            thumbnail:thumbnail,
            price:price,
            sections:sections
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
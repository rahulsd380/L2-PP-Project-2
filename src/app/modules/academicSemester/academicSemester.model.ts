import { Schema, model } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterMonths } from "./academicSemester.constants";


const academicSemesterSchema = new Schema<TAcademicSemester>({
    name: {type: String, required: true, enum: ['Autum' , 'Summer' , 'Fall']},
    code: {type: String, required: true},
    year: {type: String},
    startMonth: {type: String, enum: AcademicSemesterMonths},
    endMonth: {type: String, enum: AcademicSemesterMonths},
});


academicSemesterSchema.pre('save', async function(next){
    const isSemesterExists = await AcademicSemester.findOne({
        year: this.year,
        name: this.name,
    })

    if(isSemesterExists){
        throw new Error('Semester already exists!');
    };

    next();
})

export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema);
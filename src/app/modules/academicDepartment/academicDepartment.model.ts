import { Schema, model } from "mongoose";
import TAcademicDepartment from "./academicDepartment.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: {type: String, required: true, unique: true},
    academicFaculty: {type: Schema.Types.ObjectId, ref: "AcademicFaculty"}
}, {
    timestamps: true
});


academicDepartmentSchema.pre('save', async function(next){
    const isDepartmentExists = await AcademicDepartment.findOne({
        name: this.name
    })

    if(isDepartmentExists){
        throw new AppError(httpStatus.NOT_FOUND, 'This department is already exists.')
    }
    next();
})

export const AcademicDepartment = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema);
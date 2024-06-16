import TAcademicDepartment from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";


const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartment = async () => {
    const result = await AcademicDepartment.find().populate('academicFaculty');
    return result;
}

const getSingleAcademicDepartmentById = async (id: string) => {
    const result = await AcademicDepartment.findById(id).populate('academicFaculty');
    return result;
}

export const AcademicDepartmentServices = {
    createAcademicDepartmentIntoDB,
  getAllAcademicDepartment,
  getSingleAcademicDepartmentById
};
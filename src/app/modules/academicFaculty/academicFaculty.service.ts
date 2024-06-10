import TAcademicFaculty from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";


const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFaculty = async () => {
    const result = await AcademicFaculty.find();
    return result;
}

const getSingleAcademicFacultyById = async (id: string) => {
    const result = await AcademicFaculty.findById(id);
    return result;
}

export const AcademicFacultyServices = {
    createAcademicFacultyIntoDB,
  getAllAcademicFaculty,
  getSingleAcademicFacultyById,
};
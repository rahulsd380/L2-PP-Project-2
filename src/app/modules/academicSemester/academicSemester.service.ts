import { academicSemesterNameCodeMapper } from "./academicSemester.constants";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createacademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid Semester Code !");
  }

  const result = AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemester = async () => {
    const result = await AcademicSemester.find();
    return result;
}

const getAllAcademicSemesterById = async (id: string) => {
    const result = await AcademicSemester.findById(id);
    return result;
}

export const AcademicSemesterServices = {
  createacademicSemesterIntoDb,
  getAllAcademicSemester,
  getAllAcademicSemesterById,
};

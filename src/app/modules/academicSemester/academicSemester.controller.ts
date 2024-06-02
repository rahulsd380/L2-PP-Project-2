import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";
import sendResponse from './../../utils/sendResponse';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createacademicSemesterIntoDb(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester created successfully",
    data: result,
  });
});


const getAllAcademicSemester = catchAsync(async(req, res) => {
    const result = await AcademicSemesterServices.getAllAcademicSemester();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic semesters fetched successfully!",
        data: result,
      });
      
})


const getAllAcademicSemesterById = catchAsync(async(req, res) => {
    const id = req.params.id;
    const result = await AcademicSemesterServices.getAllAcademicSemesterById(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic semesters fetched successfully!",
        data: result,
      });
})

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getAllAcademicSemesterById
  
};

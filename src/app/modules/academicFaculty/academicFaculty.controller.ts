import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicFacultyServices } from "./academicFaculty.service";
import sendResponse from "../../utils/sendResponse";

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculty created successfully",
    data: result,
  });
});


const getAllAcademicFaculty = catchAsync(async(req, res) => {
    const result = await AcademicFacultyServices.getAllAcademicFaculty();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic faculty fetched successfully!",
        data: result,
      });
      
})


const getSingleAcademicFacultyById = catchAsync(async(req, res) => {
    const id = req.params.id;
    const result = await AcademicFacultyServices.getSingleAcademicFacultyById(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic faculty fetched successfully!",
        data: result,
      });
})

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFacultyById
  
};

import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepartmentServices } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department created successfully",
    data: result,
  });
});


const getAllAcademicDepartment = catchAsync(async(req, res) => {
    const result = await AcademicDepartmentServices.getAllAcademicDepartment();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Department fetched successfully!",
        data: result,
      });
      
})


const getSingleAcademicDepartmentById = catchAsync(async(req, res) => {
    const id = req.params.id;
    const result = await AcademicDepartmentServices.getSingleAcademicDepartmentById(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Department fetched successfully!",
        data: result,
      });
})

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartmentById
  
};

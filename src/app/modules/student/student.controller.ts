import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./student.service";
// import StudentJoiSchema from "./student.Joi.validation";
// const Joi = require('joi');
import { z } from "zod";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  // Controller is calling the service function to get all products
  const result = await StudentServices.getAllStudents();
  res.json({
    success: true,
    message: "Students fetched successfully!",
    data: result,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student created successfully",
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
};

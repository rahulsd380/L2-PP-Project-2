import express from "express";
import { StudentControllers } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { StudentValidations } from "./student.validation";

const router = express.Router();

//will call the controller function

router.get("/", StudentControllers.getAllStudents);

router.get('/:studentId', StudentControllers.getSingleStudent);
router.delete('/:studentId', StudentControllers.deleteStudent);
router.patch('/:studentId', validateRequest(StudentValidations.updateStudentZodSchema), StudentControllers.updateStudent);

export const StudentRoutes = router;

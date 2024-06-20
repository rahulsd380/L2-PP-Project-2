import express from "express";
import { StudentControllers } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { StudentValidations } from "./student.validation";

const router = express.Router();

//will call the controller function

router.get("/", StudentControllers.getAllStudents);

router.get('/:id', StudentControllers.getSingleStudent);
router.delete('/:id', StudentControllers.deleteStudent);
router.patch('/:id', validateRequest(StudentValidations.updateStudentZodSchema), StudentControllers.updateStudent);

export const StudentRoutes = router;

import express from 'express';
import { UserControllers } from './users.controller';
import { StudentValidations } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();



router.post('/create-student',validateRequest(StudentValidations.StudentZodSchema), UserControllers.createStudent);

export const userRoutes = router;
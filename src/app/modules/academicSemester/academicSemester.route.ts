import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';
import { AcademicSemesterControllers } from './academicSemester.controller';

const router = express.Router();

router.post('/create-academic-semester',validateRequest(AcademicSemesterValidations.AcademicSemesterValidation), AcademicSemesterControllers.createAcademicSemester);

router.get('/', AcademicSemesterControllers.getAllAcademicSemester)
router.get('/:id', AcademicSemesterControllers.getAllAcademicSemesterById)

export const AcademicSemesterRoutes = router;
import { z } from "zod";

// Creating Zod schema for creating a student
const StudentZodSchema = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
      name: z.object({
        firstName: z.string().max(20),
        middleName: z.string(),
        lastName: z.string().max(20),
      }),
      gender: z.enum(["male", "female", "other"]),
      dateOfBirth: z.string(),
      phoneNumber: z.string(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: z.object({
        fathersInfo: z.object({
          fathersName: z.string(),
          fathersOccupation: z.string(),
          fathersPhoneNo: z.string(),
        }),
        mothersInfo: z.object({
          mothersName: z.string(),
          mothersOccupation: z.string(),
          mothersPhoneNo: z.string(),
        }),
      }),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      email: z.string().email(),
      profileImg: z.string(),
    }),
  }),
});

// Creating Zod schema for updating a student with all fields optional
const updateStudentZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string().max(20).optional(),
        middleName: z.string().optional(),
        lastName: z.string().max(20).optional(),
      }).optional(),
      gender: z.enum(["male", "female", "other"]).optional(),
      dateOfBirth: z.string().optional(),
      phoneNumber: z.string().optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: z.object({
        fathersInfo: z.object({
          fathersName: z.string().optional(),
          fathersOccupation: z.string().optional(),
          fathersPhoneNo: z.string().optional(),
        }).optional(),
        mothersInfo: z.object({
          mothersName: z.string().optional(),
          mothersOccupation: z.string().optional(),
          mothersPhoneNo: z.string().optional(),
        }).optional(),
      }).optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
      email: z.string().email().optional(),
      profileImg: z.string().optional(),
    }).optional(),
  }),
});

export const StudentValidations = {
  StudentZodSchema,
  updateStudentZodSchema,
};

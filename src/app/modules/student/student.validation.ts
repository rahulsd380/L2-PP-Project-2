import { z } from "zod";

// Creating Zod schema
const StudentZodSchema = z.object({
    body: z.object({
    password : z.string(),
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
    email: z.string().email(),
    profileImg: z.string(),
    })
    })
});

export const StudentValidations = {
    StudentZodSchema
};

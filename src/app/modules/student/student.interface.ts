import { Schema, model, connect, Model, Types } from "mongoose";

export type IStudent = {
  id: string;
  user: Types.ObjectId,
  password : string;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  phoneNumber: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: {
    fathersInfo: {
      fathersName: string;
      fathersOccupation: string;
      fathersPhoneNo: string;
    };
    mothersInfo: {
      mothersName: string;
      mothersOccupation: string;
      mothersPhoneNo: string;
    };
  };
  admissionSemester: Types.ObjectId;
  email: string;
  profileImg?: string;
};
// for creating static
export interface StudentModel extends Model<IStudent>{
  isStudentExists(id : string) : Promise<IStudent | null>;
}

// for creating instance
// export type StudentMethods = {
//   isStudentExists(id : string) : Promise<IStudent | null>;
// };

// export type StudentModel = Model<IStudent, Record<string, never> , StudentMethods>

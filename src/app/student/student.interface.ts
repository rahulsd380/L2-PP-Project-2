import { Schema, model, connect } from "mongoose";

export type IStudent = {
  id: number;
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
  email: string;
  profileImg?: string;
};

import { Schema, model } from "mongoose";
import { TUser } from "./users.interface";
import bcrypt  from 'bcrypt';
import config from "../../config";

const userSchema: Schema = new Schema<TUser>(
  {
    id: { type: String, required: true },
    password: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function(next){
  this.password = await bcrypt.hash(this.password as string, Number(config.bcrypt_salt_round))
  next();
})

userSchema.post('save', function(doc, next){
 doc.password= "";
 next();
})

export const User = model<TUser>("User", userSchema);

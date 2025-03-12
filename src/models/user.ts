import { Schema, model } from "mongoose";

export interface User {
  email: string;
  username: string;
  password: string;
  createdAt?: Date;
  modifiedAt?: Date;
}

export interface DBUser extends User, Document {
  _id: string;
}

export interface ReturnUser {
  email: string;
  username: string;
  _id: string;
}

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});

const UserModel = model("User", userSchema);

export default UserModel;

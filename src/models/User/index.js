import { Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 30,
  },
  photo: {
    type: String,
    required: true,
  },
});

const User = model("users", UserSchema);

export default User;

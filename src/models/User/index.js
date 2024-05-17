import { compare, bcrypt } from "bcrypt";
import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
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
      match: /\S+@\S+\.\S+/,
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
  },
  {
    timestamps: true,
    methods: {
      comparePasswords: async function (candidatePassword) {
        const isCorrectPassword = await bcrypt.compare(
          candidatePassword,
          this.password
        );
        return isCorrectPassword;
      },
    },
  }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = model("users", UserSchema);

export default User;

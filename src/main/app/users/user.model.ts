import {model, Schema, Types} from "mongoose";
import bcrypt from "bcrypt";
import {IUser} from "../../interfaces/user.interface";

const userSchema = new Schema<IUser>(
  {
    userId: {
      type: Types.ObjectId,
      unique: [true, 'User already exist'],
    },
  },
  {timestamps: true}
);

// userSchema.pre("save", async function (this, next) {
//   const hashPassword = await bcrypt.hash(this.password as string, 5);
//   this.password = hashPassword;
//   next();
// });

const UserModel = model("user", userSchema);

export default UserModel;

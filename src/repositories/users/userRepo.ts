import UserModel, { DBUser, User } from "../../models/user";

export class UserRepo {
  static async create(user: User) {
    const newUser = new UserModel(user);

    return newUser.save();
  }

  static async findByEmail(email: string) {
    const user = await UserModel.findOne({ email });

    return user;
  }
}

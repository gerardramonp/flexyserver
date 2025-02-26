import UserModel, { User } from "../../models/user";

export class UserRepo {
  static async create(user: User): Promise<User> {
    const newUser = new UserModel(user);

    return newUser.save();
  }
}

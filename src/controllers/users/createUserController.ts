import { UserRepo } from "../../repositories/users/userRepo";
import { LogsRepo } from "../../repositories/logs/logsRepo";
import { LogType } from "../../models/logs";
import { ReturnUser, User } from "../../models/user";
import bcrypt from "bcrypt";

const createUserController = async (user: User): Promise<ReturnUser> => {
  try {
    const { email, username, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserRepo.create({
      email,
      username,
      password: hashedPassword,
    });

    await LogsRepo.create({
      message: "User created",
      type: LogType.CREATION,
      data: newUser,
    });

    return {
      _id: newUser._id.toString(),
      email: newUser.email,
      username: newUser.username,
    };
  } catch (error) {
    await LogsRepo.create({
      message: "Error creating user",
      type: LogType.ERROR,
      data: error,
    });
    throw error;
  }
};

export default createUserController;

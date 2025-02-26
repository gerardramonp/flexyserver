import { UserRepo } from "../../repositories/users/userRepo";
import { LogsRepo } from "../../repositories/logs/logsRepo";
import { LogType } from "../../models/logs";
import { User } from "../../models/user";

const createUserController = async (user: User) => {
  try {
    const { email, username, password } = user;
    const newUser = await UserRepo.create({ email, username, password });

    await LogsRepo.create({
      message: "User created",
      type: LogType.CREATION,
      data: newUser,
    });

    return newUser;
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

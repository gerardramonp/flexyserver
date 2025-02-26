import { UserRepo } from "../../repositories/users/userRepo";
import { LogsRepo } from "../../repositories/logs/logsRepo";
import { LogType } from "../../models/logs";
import { ReturnUser, User } from "../../models/user";
import bcrypt from "bcrypt";

const loginController = async (user: User): Promise<ReturnUser> => {
  try {
    const { email, password } = user;
    const existingUser = await UserRepo.findByEmail(email);

    if (!existingUser) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    await LogsRepo.create({
      message: "User logged in",
      type: LogType.LOGIN,
      data: existingUser,
    });

    return {
      _id: existingUser._id.toString(),
      email: existingUser.email,
      username: existingUser.username,
    };
  } catch (error) {
    await LogsRepo.create({
      message: "Error logging in",
      type: LogType.ERROR,
      data: error,
    });
    throw error;
  }
};

export default loginController;

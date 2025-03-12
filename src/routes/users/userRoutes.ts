import express, { Request, Response } from "express";
import createUserController from "../../controllers/users/createUserController";
import loginController from "../../controllers/users/loginController";

const router = express.Router();

// router.post("/", async (req: Request, res: Response) => {
//   try {
//     const user = req.body;

//     if (!user.email || !user.username || !user.password) {
//       return res.status(400).send("Missing required fields");
//     }

//     const newUser = await createUserController(user);
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

router.post("/login", async (req: Request, res: Response) => {
  try {
    const user = req.body;

    if (!user.email || !user.password) {
      return res.status(400).send("Missing required fields");
    }

    const loggedInUser = await loginController(user);

    res.status(200).json(loggedInUser);
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

export default router;

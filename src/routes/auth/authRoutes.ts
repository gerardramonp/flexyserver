import express, { Request, Response } from "express";

import loginController from "../../controllers/users/loginController";

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const user = req.body;

    console.log("cclog asdad", user);
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

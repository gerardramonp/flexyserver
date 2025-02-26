import express, { Request, Response } from "express";
import createUserController from "../../controllers/users/createUserController";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const user = req.body;

    if (!user.email || !user.username || !user.password) {
      return res.status(400).send("Missing required fields");
    }

    const newUser = await createUserController(user);
    res.json(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;

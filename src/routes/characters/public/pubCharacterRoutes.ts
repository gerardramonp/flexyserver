import express, { Request, Response } from "express";
import Character from "../../../models/character";

const router = express.Router();

// Get all characters
router.get("/", async (req: Request, res: Response) => {
  try {
    const characters = await Character.find();
    res.status(200).send(characters);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;

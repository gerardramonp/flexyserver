import express, { Request, Response } from "express";
import Character from "../../../models/character";
import { createCharacterController } from "../../../controllers/characters/createCharacterController";

const router = express.Router();

// Create new character
router.post("/", async (req: Request, res: Response) => {
  try {
    const charData = req.body;
    const character = await createCharacterController(charData);
    res.status(200).send(character);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;

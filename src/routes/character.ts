import express, { Request, Response } from "express";
import Character from "../models/character";

const router = express.Router();

// Create a new character
router.post("/", async (req: Request, res: Response) => {
  try {
    const character = new Character(req.body);
    await character.save();
    res.status(201).send(character);
  } catch (error) {
    res.status(400).send(error);
  }
});

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

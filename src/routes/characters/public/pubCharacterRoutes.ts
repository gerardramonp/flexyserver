import express, { Request, Response } from "express";
import { getAllCharactersController } from "../../../controllers/characters/getAllCharactersController";

const router = express.Router();

// Get all characters
router.get("/", async (req: Request, res: Response) => {
  try {
    const characters = await getAllCharactersController();
    res.status(200).json(characters);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;

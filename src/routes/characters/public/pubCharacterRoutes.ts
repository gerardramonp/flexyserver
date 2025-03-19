import express, { Request, Response } from "express";
import { getAllCharactersController } from "../../../controllers/characters/getAllCharactersController";
import { createCharacterController } from "../../../controllers/characters/createCharacterController";
import { CharacterRepo } from "../../../repositories/characters/characterRepo";
import { TibiaAPI } from "../../../external/tibiaApi/getCharacter";
import { ERROR_CHARACTER_NOT_FOUND } from "../../../constants/errors";

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

router.post("/", async (req: Request, res: Response) => {
  try {
    const character = req.body;

    // Body validation
    if (!character.deaths) {
      character.deaths = [];
    }
    if (!character.levelProgression) {
      character.levelProgression = [];
    }
    if (!character.displayname) {
      character.displayname = character.name;
    }

    // External api validations
    const tibiaChar = await TibiaAPI.getCharacter(character.name);

    // DB validations
    const existingCharacter = await CharacterRepo.getByName(character.name);

    if (existingCharacter) {
      return res.status(409).send("Character already exists");
    }

    const createdCharacter = await createCharacterController(character);
    res.status(200).send(createdCharacter);
  } catch (error: any) {
    if (error.status === 502) {
      return res.status(404).send(ERROR_CHARACTER_NOT_FOUND);
    }

    return res.status(500).send(error);
  }
});

export default router;

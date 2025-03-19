import { CharacterRepo } from "../../repositories/characters/characterRepo";
import { Character } from "../../models/character";

export const createCharacterController = async (character: Character) => {
  try {
    const newCharacter = await CharacterRepo.create(character);

    return newCharacter;
  } catch (error) {
    throw error;
  }
};

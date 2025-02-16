import { CharacterRepo } from "../../repositories/characters/characterRepo";
import { Character } from "../../models/character";

export const createCharacterController = async (character: Character) => {
  try {
    if (!character.deaths) {
      character.deaths = [];
    }
    if (!character.levelProgression) {
      character.levelProgression = [];
    }

    const newCharacter = await CharacterRepo.create(character);

    return newCharacter;
  } catch (error) {
    throw error;
  }
};

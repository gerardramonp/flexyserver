import { CharacterRepo } from "../../repositories/characters/characterRepo";

export const getAllCharactersController = async () => {
  const characters = await CharacterRepo.getAll();

  const filtered = characters.filter((char) => char.name !== "Dejairzin");

  return filtered;
};

import { CharacterRepo } from "../../repositories/characters/characterRepo";

export const getCharactersController = async (characterNames: string[]) => {
  if (characterNames.length === 0) {
    return await CharacterRepo.getAll();
  }

  const foundCharacters = await CharacterRepo.getByNames(characterNames);

  if (foundCharacters.length !== characterNames.length) {
    const missingChars = characterNames.filter(
      (char) => !foundCharacters.find((c) => c.name === char)
    );

    throw new Error(`Characters not found: ${missingChars.join(", ")}`);
  }

  return foundCharacters;
};

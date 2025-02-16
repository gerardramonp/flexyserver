import { CharacterRepo } from "../../repositories/characters/characterRepo";
import CharacterModel, {
  AdaptedCharacter,
  Character,
  Death,
  LevelProgression,
} from "../../models/character";
import { TibiaAPI } from "../../external/tibiaApi/getCharacter";
import { LogsRepo } from "../../repositories/logs/logsRepo";
import { LogType } from "../../models/logs";
import mongoose from "mongoose";

const getCharacterNewDeaths = (
  char: Character,
  apiCharacter: AdaptedCharacter
): Death[] => {
  return apiCharacter.deaths
    .filter(
      (apiDeath) => !char.deaths.some((death) => death.time === apiDeath.time)
    )
    .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
};

export const syncCharactersController = async () => {
  try {
    const characters = await CharacterRepo.getAll();

    const updatedCharacters: Character[] = [];
    const newCharacterDeaths: { [characterName: string]: Death[] } = {};

    for (const char of characters) {
      const apiCharacter = await TibiaAPI.getCharacter(char.name);

      let updated = false;

      if (apiCharacter.level > char.level) {
        char.level = apiCharacter.level;
        char.levelProgression.push({
          level: apiCharacter.level,
          date: new Date().toISOString(),
        } as LevelProgression);
        updated = true;
      }

      const newDeaths = getCharacterNewDeaths(char, apiCharacter);

      if (newDeaths.length > 0) {
        newCharacterDeaths[char.name] = newDeaths;
        updated = true;
      }

      if (updated) {
        updatedCharacters.push(char);
      }
    }

    if (updatedCharacters.length > 0) {
      await CharacterModel.bulkWrite(
        updatedCharacters.map((char) => ({
          updateOne: {
            filter: { _id: char._id },
            update: {
              $set: { level: char.level },
              $push: {
                levelProgression: { $each: char.levelProgression.slice(-1) },
                deaths: { $each: newCharacterDeaths[char.name] },
              },
            } as mongoose.UpdateQuery<Character>,
          },
        }))
      );
    }

    return true;
  } catch (error) {
    await LogsRepo.create({
      message: "Error syncing characters",
      type: LogType.ERROR,
      data: error,
    });
    throw error;
  }
};

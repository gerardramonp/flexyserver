import { CharacterRepo } from "../../repositories/characters/characterRepo";
import CharacterModel, {
  AdaptedCharacter,
  Character,
  Death,
} from "../../models/character";
import { TibiaAPI } from "../../external/tibiaApi/getCharacter";
import { LogsRepo } from "../../repositories/logs/logsRepo";
import { LogType } from "../../models/logs";
import { getCurrentDate } from "../../utils/getCurrentDate";

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

    const apiCharacters = await Promise.all(
      characters.map((char) =>
        TibiaAPI.getCharacter(char.name, char.displayname)
      )
    );

    const updatedCharacters: Character[] = [];

    for (const char of characters) {
      const apiCharacter = apiCharacters.find(
        (apiChar) => apiChar.name === char.name
      );

      if (!apiCharacter) continue;

      let updated = false;

      if (apiCharacter.level !== char.level) {
        char.level = apiCharacter.level;
        char.levelProgression.push({
          level: apiCharacter.level,
          date: getCurrentDate(),
        });
        updated = true;
      }

      const newDeaths = getCharacterNewDeaths(char, apiCharacter);

      if (newDeaths.length > 0) {
        char.deaths.push(...newDeaths);
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
              $set: {
                level: char.level,
                levelProgression: char.levelProgression,
                deaths: char.deaths,
              },
            },
          },
        }))
      );
    }

    await LogsRepo.create({
      message: "Finished syncing characters",
      type: LogType.SYNC,
      data: `Updated ${updatedCharacters.length} characters`,
      time: getCurrentDate(),
    });

    return true;
  } catch (error) {
    await LogsRepo.create({
      message: "Error syncing characters",
      type: LogType.ERROR,
      data: error,
      time: getCurrentDate(),
    });
    throw error;
  }
};

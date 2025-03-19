import axios from "axios";
import { AdaptedCharacter, Death } from "../../models/character";
import { ERROR_CHARACTER_NOT_FOUND } from "../../constants/errors";

export interface CharacterDeathResponse {
  time: string;
  level: number;
  killers: {
    name: string;
    player: boolean;
    traded: boolean;
    summon: string;
  }[];
  assists: any[];
  reason: string;
}

export interface GetCharacterResponse {
  character: {
    character: {
      name: string;
      sex: string;
      title: string;
      unlocked_titles: number;
      vocation: string;
      level: number;
      achievement_points: number;
      world: string;
      residence: string;
      guild: Record<string, unknown>;
      last_login: string;
      account_status: string;
    };
    deaths: CharacterDeathResponse[];
    deaths_truncated: boolean;
    account_information: {
      created: string;
      loyalty_title: string;
    };
    other_characters: {
      name: string;
      world: string;
      status: string;
      deleted: boolean;
      main: boolean;
      traded: boolean;
    }[];
  };
  information: {
    api: {
      version: number;
      release: string;
      commit: string;
    };
    timestamp: string;
    tibia_urls: string[];
    status: {
      http_code: number;
    };
  };
}

function adaptDeaths(deaths: CharacterDeathResponse[]): Death[] {
  return deaths.map((death) => {
    return {
      time: death.time,
      level: death.level,
      reason: death.reason,
    };
  });
}

export class TibiaAPI {
  static async getCharacter(name: string): Promise<AdaptedCharacter> {
    const response = await axios.get(
      `https://api.tibiadata.com/v4/character/${name}`
    );

    if (response.data.information.status.http_code === 502) {
      throw new Error(ERROR_CHARACTER_NOT_FOUND);
    }

    const char = response.data.character;

    const adaptedDeaths = adaptDeaths(char?.deaths || []);

    return {
      name: char.character.name,
      displayname: char.character.title,
      level: char.character.level,
      deaths: adaptedDeaths,
      levelProgression: [],
    };
  }
}

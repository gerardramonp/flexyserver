import CharacterModel, { Character } from "../../models/character";

export class CharacterRepo {
  static async create(charData: Character) {
    const characters = await CharacterModel.create(charData);
    return characters;
  }
}

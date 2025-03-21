import CharacterModel, { Character } from "../../models/character";

export class CharacterRepo {
  static async getAll(): Promise<Character[]> {
    const characters = await CharacterModel.find();
    return characters;
  }

  static async getByName(name: string): Promise<Character | null> {
    const character = await CharacterModel.findOne()
      .where("name")
      .regex(new RegExp(`^${name}$`, "i"));
    return character;
  }

  static async getByNames(names: string[]): Promise<Character[]> {
    const characters = await CharacterModel.find()
      .where("name")
      .in(names.map((name) => new RegExp(`^${name}$`, "i")));
    return characters;
  }

  static async create(charData: Character): Promise<Character> {
    const characters = await CharacterModel.create(charData);
    return characters;
  }
}

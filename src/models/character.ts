import mongoose, { Document, Schema } from "mongoose";

export interface Death {
  time: string;
  level: number;
  reason: string;
}

export interface LevelProgression {
  level: number;
  date: string;
}

export interface AdaptedCharacter {
  name: string;
  displayname: string;
  level: number;
  deaths: Death[];
  levelProgression: LevelProgression[];
  vocation: string;
  world: string;
}

export interface Character extends AdaptedCharacter, Document {}

const deathSchema = new Schema<Death>(
  {
    time: { type: String, required: true },
    level: { type: Number, required: true },
    reason: { type: String, required: true },
  },
  { _id: false }
);

const levelProgressionSchema = new Schema<LevelProgression>(
  {
    level: { type: Number, required: true },
    date: { type: String, required: true },
  },
  { _id: false }
);

const characterSchema = new Schema<Character>({
  name: { type: String, required: true },
  displayname: { type: String, required: true },
  level: { type: Number, required: true },
  deaths: { type: [deathSchema], required: false, default: [] },
  levelProgression: {
    type: [levelProgressionSchema],
    required: false,
    default: [],
  },
  vocation: { type: String, required: true },
  world: { type: String, required: true },
});

const CharacterModel = mongoose.model<Character>("Character", characterSchema);

export default CharacterModel;

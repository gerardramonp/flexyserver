import mongoose, { Document, Schema } from "mongoose";

interface Death {
  time: string;
  level: number;
  reason: string;
}

interface LevelProgression {
  level: number;
  date: string;
}

interface Character extends Document {
  name: string;
  displayname: string;
  level: number;
  deaths: Death[];
  levelProgression: LevelProgression[];
}

const deathSchema = new Schema<Death>({
  time: { type: String, required: true },
  level: { type: Number, required: true },
  reason: { type: String, required: true },
});

const levelProgressionSchema = new Schema<LevelProgression>({
  level: { type: Number, required: true },
  date: { type: String, required: true },
});

const characterSchema = new Schema<Character>({
  name: { type: String, required: true },
  displayname: { type: String, required: true },
  level: { type: Number, required: true },
  deaths: { type: [deathSchema], required: true },
  levelProgression: { type: [levelProgressionSchema], required: true },
});

const CharacterModel = mongoose.model<Character>("Character", characterSchema);

export default CharacterModel;

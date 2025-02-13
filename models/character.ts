import mongoose from "mongoose";

const deathSchema = new mongoose.Schema({
  time: String,
  level: Number,
  reason: String,
});

const levelProgressionSchema = new mongoose.Schema({
  level: Number,
  date: String,
});

const characterSchema = new mongoose.Schema({
  name: String,
  displayname: String,
  level: Number,
  deaths: [deathSchema],
  levelProgression: [levelProgressionSchema],
});

const Character = mongoose.model("Character", characterSchema);

export default Character;

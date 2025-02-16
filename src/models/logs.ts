import { Schema, model, Document } from "mongoose";

export enum LogType {
  ERROR = "ERROR",
  SYNC = "SYNC",
}

export interface Log {
  message: string;
  type: LogType;
  time?: string;
  data?: any;
}

const logSchema = new Schema<Log>({
  message: { type: String, required: true },
  type: { type: String, enum: Object.values(LogType), required: true },
  time: { type: Date, default: Date.now },
  data: { type: Schema.Types.Mixed, required: false, default: null },
});

const LogModel = model<Log>("Log", logSchema);

export default LogModel;

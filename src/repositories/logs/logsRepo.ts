import LogModel, { Log } from "../../models/logs";

export class LogsRepo {
  static async create(log: Log): Promise<Log> {
    const newLog = await LogModel.create(log);
    return newLog;
  }
}

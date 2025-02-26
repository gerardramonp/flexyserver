import LogModel, { Log } from "../../models/logs";
import { getCurrentDate } from "../../utils/getCurrentDate";

export class LogsRepo {
  static async create(log: Log): Promise<Log> {
    if (!log.time) {
      log.time = getCurrentDate();
    }

    const newLog = await LogModel.create(log);
    return newLog;
  }
}

import LogModel, { Log } from "../../models/logs";
import { getCurrentDate } from "../../utils/getCurrentDate";

// Helper to sanitize data to avoid BSON cyclic dependency errors when storing
// Mongoose documents or Error objects inside the Log document.
const sanitizeData = (data: any) => {
  if (!data) return data;

  // Convert Mongoose documents to plain objects
  if (typeof data.toObject === "function") {
    try {
      data = data.toObject();
    } catch (_) {
      // fall through if toObject fails
    }
  }

  // Reduce Error objects to serializable subset
  if (data instanceof Error) {
    return {
      name: data.name,
      message: data.message,
      stack: data.stack,
    };
  }

  // Fallback: attempt to safely stringify & parse removing circular refs
  const seen = new WeakSet();
  try {
    return JSON.parse(
      JSON.stringify(data, (_, value) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) return "[Circular]";
          seen.add(value);
        }
        return value;
      })
    );
  } catch (_) {
    // If serialization fails, return a simple description
    return { description: "Unserializable data" };
  }
};

export class LogsRepo {
  static async create(log: Log): Promise<Log> {
    if (!log.time) {
      log.time = getCurrentDate();
    }

    if (log.data) {
      log.data = sanitizeData(log.data);
    }

    const newLog = await LogModel.create(log);
    return newLog;
  }
}

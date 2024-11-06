import { Database } from "bun:sqlite";
const db = new Database("timecapsule.sqlite", { strict: true });
db.exec("PRAGMA journal_mode = WAL;");
export default db;

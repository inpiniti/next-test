import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

const db = drizzle(process.env.DATABASE_URL!);
//const db = drizzle(process.env.SUPABASE_URL!);

export default db;

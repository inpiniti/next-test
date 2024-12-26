import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

// Function to initialize the database connection
const initializeDb = () => {
  try {
    // 시도: PRIMARY DATABASE_URL로 연결
    const primaryDb = drizzle(process.env.DATABASE_URL!);
    console.log("Primary DATABASE_URL에 성공적으로 연결되었습니다.");
    return primaryDb;
  } catch (error) {
    console.error("Primary DATABASE_URL 연결 실패:", error);

    try {
      // 실패 시: LOCAL_DATABASE_URL로 연결
      const fallbackDb = drizzle(process.env.LOCAL_DATABASE_URL!);
      console.log("LOCAL_DATABASE_URL에 성공적으로 연결되었습니다.");
      return fallbackDb;
    } catch (fallbackError) {
      console.error("LOCAL_DATABASE_URL 연결 실패:", fallbackError);
      throw new Error("데이터베이스 연결에 실패했습니다.");
    }
  }
};

const db = initializeDb();
//const db = drizzle(process.env.SUPABASE_URL!);

export default db;

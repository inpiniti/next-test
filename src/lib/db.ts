import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

// Function to initialize the database connection
const initializeDb = () => {
  if (process.env.NODE_ENV === 'development') {
    //const fallbackDb = drizzle(process.env.LOCAL_DATABASE_URL!);
    const fallbackDb = drizzle(process.env.DATABASE_URL!);
    return fallbackDb;
  } else if (process.env.NODE_ENV === 'production') {
    const primaryDb = drizzle(process.env.DATABASE_URL!);
    return primaryDb;
  } else {
    throw new Error('데이터베이스 연결에 실패했습니다.');
  }
};

const db = initializeDb;
//const db = drizzle(process.env.SUPABASE_URL!);

export default db;

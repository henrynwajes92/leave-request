import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL!;

// This guarantees a single connection pool is shared across your Next.js app
const globalForDb = globalThis as unknown as { conn: ReturnType<typeof postgres> };

export const sql = globalForDb.conn || postgres(connectionString, { ssl: 'require' });

if (process.env.NODE_ENV !== 'production') globalForDb.conn = sql;
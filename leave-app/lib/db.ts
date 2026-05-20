import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL!;

// Explicitly type the global context storage
const globalForDb = globalThis as unknown as { conn: postgres.Sql };

// Enforce the postgres.Sql type on export
export const sql: postgres.Sql = globalForDb.conn || postgres(connectionString, { 
  ssl: 'require',
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

if (process.env.NODE_ENV !== 'production') globalForDb.conn = sql;
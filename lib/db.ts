import { Pool } from "pg"

// Required envs:
// - DATABASE_URL (e.g., postgres://user:pass@host:5432/db)

export const pool = new Pool({ connectionString: process.env.DATABASE_URL })

export async function query<T = any>(text: string, params?: any[]): Promise<{ rows: T[] }> {
  const client = await pool.connect()
  try {
    const res = await client.query(text, params)
    return { rows: res.rows }
  } finally {
    client.release()
  }
}


import { Pool } from "pg"

// Required envs:
// - DATABASE_URL (e.g., postgres://user:pass@host:5432/db)

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  console.warn("DATABASE_URL não definida; consultas ao banco serão puladas.")
}

const shouldUseSSL =
  !!connectionString &&
  !/localhost|127\.0\.0\.1|::1/.test(connectionString) &&
  process.env.DATABASE_SSL !== "false"

export const pool = connectionString
  ? new Pool({
      connectionString,
      ssl: shouldUseSSL ? { rejectUnauthorized: false } : undefined,
    })
  : null

export function databaseAvailable(): boolean {
  return Boolean(pool)
}

export async function query<T = any>(text: string, params?: any[]): Promise<{ rows: T[] }> {
  if (!pool) {
    console.warn("Pool de conexões indisponível; retornando conjunto vazio.")
    return { rows: [] }
  }

  let client
  try {
    client = await pool.connect()
  } catch (error) {
    console.error("Falha ao conectar ao banco de dados.", error)
    return { rows: [] }
  }

  try {
    const res = await client.query(text, params)
    return { rows: res.rows }
  } catch (error) {
    console.error("Erro ao executar consulta.", error)
    return { rows: [] }
  } finally {
    client?.release()
  }
}

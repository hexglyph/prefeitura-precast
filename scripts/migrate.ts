import { readFileSync, readdirSync } from "fs"
import { join } from "path"
import { query } from "../lib/db"

async function run() {
  const dir = join(process.cwd(), "migrations")
  const files = readdirSync(dir).filter((f) => f.endsWith(".sql")).sort()
  for (const f of files) {
    const sql = readFileSync(join(dir, f), "utf8")
    console.log(`Applying migration: ${f}`)
    await query(sql)
  }
  console.log("Migrations applied.")
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

import { NextResponse } from "next/server"
import { fetchIndicadores } from "@/lib/observasampa"
import { query } from "@/lib/db"

export async function POST() {
  try {
    const list = await fetchIndicadores({ limit: 2000 })
    let inserted = 0
    for (const item of list || []) {
      await query(
        `INSERT INTO indicators (indicator_id, name, metadata)
         VALUES ($1, $2, $3)
         ON CONFLICT (indicator_id) DO UPDATE SET name=EXCLUDED.name`,
        [item.cd_indicador, item.nm_indicador, { source: "observasampa" } as any]
      )
      inserted++
    }
    return NextResponse.json({ synced: inserted })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "sync_failed" }, { status: 500 })
  }
}

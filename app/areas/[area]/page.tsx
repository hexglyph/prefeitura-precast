import { AreaDashboardClient } from "@/components/area-dashboard-client"
import { getIndicatorStats } from "@/lib/stats"

type PageProps = {
  params: {
    area: string
  }
}

export default async function AreaPage({ params }: PageProps) {
  const areaParam = params?.area ?? "seguranca"

  const [alertsStats, effStats] = await Promise.all([
    getIndicatorStats(1002, "MUN", "São Paulo"),
    getIndicatorStats(1003, "MUN", "São Paulo"),
  ])

  return (
    <AreaDashboardClient
      areaParam={areaParam}
      alertsStats={alertsStats}
      effStats={effStats}
    />
  )
}

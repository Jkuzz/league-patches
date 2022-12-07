const patches = JSON.parse(await Deno.readTextFile('./patches.json'))

interface MetricsChampion {
  name: number
  class: string
  href: string
  date: string
  blueEssence: number
  rp: number
  patchSize: number
  patchPerDay: number
}

const champions: Array<MetricsChampion> = []
for (const champ of patches) {
  const releaseDate = Date.parse(champ.date)
  const age = Date.now() - releaseDate
  const daysSinceRelease = age / (1000 * 60 * 60 * 24)
  const patchPerDay = champ.patchSize / daysSinceRelease
  champions.push({ ...champ, daysSinceRelease, patchPerDay })
}

await Deno.writeTextFile(
  './metrics.json',
  JSON.stringify(
    champions.sort((a: MetricsChampion, b: MetricsChampion) => a.patchPerDay - b.patchPerDay)
  )
)

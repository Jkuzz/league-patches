const patches = JSON.parse(await Deno.readTextFile('./patches.json'))

interface PatchedChampion {
  name: number
  class: string
  href: string
  date: string
  blueEssence: number
  rp: number
  patchSize: number
}

const champions: Array<unknown> = []
for (const champ of patches) {
  const releaseDate = Date.parse(champ.date)
  const age = Date.now() - releaseDate
  const daysSinceRelease = age / (1000 * 60 * 60 * 24)
  const patchPerDay = champ.patchSize / daysSinceRelease
  champions.push({ ...champ, daysSinceRelease, patchPerDay })
}

console.log(champions)
await Deno.writeTextFile(
  './metrics.json',
  JSON.stringify(champions.sort((a, b) => a.patchPerDay - b.patchPerDay))
)

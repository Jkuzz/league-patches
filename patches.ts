import { cheerio } from 'https://deno.land/x/cheerio@1.0.7/mod.ts'

const champions = JSON.parse(await Deno.readTextFile('./champions.json'))

interface Champion {
  name: number
  date: string
  class: string
  href: string
  blueEssence: number
  rp: number
}

const championPatches: Array<unknown> = []
for (const champ of champions) {
  const wikiUrl = champ['href'] + '/Patch_history'
  const res = await fetch(wikiUrl)
  const html = await res.text()
  const $ = cheerio.load(html)
  const patchNotes = cheerio.default.text($('.mw-parser-output'))
  championPatches.push({ ...champ, patchSize: patchNotes.length })
}

console.log(championPatches)
await Deno.writeTextFile('./patches.json', JSON.stringify(championPatches))

import { cheerio } from 'https://deno.land/x/cheerio@1.0.7/mod.ts'

const url = 'https://leagueoflegends.fandom.com/wiki/List_of_champions'

try {
  const res = await fetch(url)
  const html = await res.text()
  const $ = cheerio.load(html)

  const championsTable = $('table.article-table')

  const champions: Array<any> = []
  $('tbody tr', championsTable).each((_i, element) => {
    champions.push({
      name: $(element).find('td').attr('data-sort-value'),
      href: 'https://leagueoflegends.fandom.com' + $(element).find('a').attr('href'),
      date: cheerio.default.text($(element).find('td:nth-child(3)')).trim(),
      class: $(element).find('td:nth-child(2)').attr('data-sort-value'),
      blueEssence: +cheerio.default.text($(element).find('td:nth-child(5)')).trim(),
      rp: +cheerio.default.text($(element).find('td:nth-child(6)')).trim(),
    })
  })

  await Deno.writeTextFile('./champions.json', JSON.stringify(champions))
} catch (error) {
  console.log(error)
}

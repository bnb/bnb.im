const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const { DateTime } = require('luxon')
const { Resvg } = require('@resvg/resvg-js')

const WIDTH = 1200
const HEIGHT = 630
const ACCENT = '#ff0099'

const fontCacheDir = path.join(__dirname, '..', '.cache', 'social-fonts')
const fonts = [
  { name: 'Playfair Display', weight: 400 },
  { name: 'Lato', weight: 400 },
  { name: 'Lato', weight: 700 }
]
const fontsCssUrl = 'https://fonts.googleapis.com/css2?family=Playfair+Display&family=Lato:wght@400;700'

// download the fonts satori needs from Google Fonts, caching them in the
// gitignored .cache directory so only the first build hits the network
async function loadFonts () {
  const cachePath = ({ name, weight }) => path.join(fontCacheDir, `${name.replaceAll(' ', '')}-${weight}.ttf`)

  if (!fonts.every((font) => fs.existsSync(cachePath(font)))) {
    fs.mkdirSync(fontCacheDir, { recursive: true })

    // a non-browser user agent makes the CSS API return TTF urls, which is
    // what satori wants (it can't read the woff2 served to modern browsers)
    const response = await fetch(fontsCssUrl, { headers: { 'User-Agent': 'curl/8' } })
    if (!response.ok) {
      throw new Error(`[social-images] Fetching font CSS failed: ${response.status}`)
    }
    const css = await response.text()

    for (const font of fonts) {
      const block = css
        .match(/@font-face\s*{[^}]*}/g)
        .find((face) => face.includes(`font-family: '${font.name}'`) && face.includes(`font-weight: ${font.weight}`))
      const url = block && block.match(/src: url\((\S+)\)/)[1]
      if (!url) {
        throw new Error(`[social-images] No TTF url found for ${font.name} ${font.weight}`)
      }

      const download = await fetch(url)
      if (!download.ok) {
        throw new Error(`[social-images] Downloading ${font.name} ${font.weight} failed: ${download.status}`)
      }
      fs.writeFileSync(cachePath(font), Buffer.from(await download.arrayBuffer()))
    }
  }

  return fonts.map((font) => ({
    name: font.name,
    weight: font.weight,
    style: 'normal',
    data: fs.readFileSync(cachePath(font))
  }))
}

const truncate = (str, max) => {
  if (!str || str.length <= max) {
    return str || ''
  }
  return str.slice(0, str.lastIndexOf(' ', max)) + '…'
}

// satori takes React-element-shaped plain objects, so no JSX needed
const card = ({ title, description, date }) => ({
  type: 'div',
  props: {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      padding: '70px 80px 60px',
      fontFamily: 'Lato'
    },
    children: [
      {
        type: 'div',
        props: {
          style: { width: 140, height: 14, backgroundColor: ACCENT, marginBottom: 50 }
        }
      },
      {
        type: 'div',
        props: {
          style: {
            fontFamily: 'Playfair Display',
            fontSize: title.length > 70 ? 56 : 66,
            lineHeight: 1.2,
            color: '#000000'
          },
          children: title
        }
      },
      {
        type: 'div',
        props: {
          style: { fontSize: 30, lineHeight: 1.5, color: '#444444', marginTop: 30, flexGrow: 1 },
          children: truncate(description, 140)
        }
      },
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            fontSize: 30
          },
          children: [
            {
              type: 'div',
              props: {
                style: { display: 'flex', color: '#000000' },
                children: [
                  { type: 'span', props: { style: { fontWeight: 700 }, children: 'Tierney Cyren' } },
                  { type: 'span', props: { style: { color: '#666666', marginLeft: 20 }, children: date } }
                ]
              }
            },
            {
              type: 'div',
              props: {
                style: { color: ACCENT, fontWeight: 700 },
                children: 'bnb.im'
              }
            }
          ]
        }
      }
    ]
  }
})

module.exports = async function generateSocialImages ({ postsDir, outputDir }) {
  const { default: satori } = await import('satori')

  fs.mkdirSync(outputDir, { recursive: true })

  const posts = fs.readdirSync(postsDir).filter((file) => file.endsWith('.md'))
  let satoriFonts
  let generated = 0

  for (const file of posts) {
    const source = path.join(postsDir, file)
    const target = path.join(outputDir, file.replace(/\.md$/, '.png'))

    // skip images that are newer than both the post and this generator
    if (fs.existsSync(target)) {
      const targetTime = fs.statSync(target).mtimeMs
      if (targetTime > fs.statSync(source).mtimeMs && targetTime > fs.statSync(__filename).mtimeMs) {
        continue
      }
    }

    if (!satoriFonts) {
      satoriFonts = await loadFonts()
    }

    const { data } = matter(fs.readFileSync(source, 'utf8'))

    const svg = await satori(card({
      title: truncate(data.title, 110),
      description: data.description,
      date: DateTime.fromJSDate(data.date, { zone: 'utc' }).toFormat('dd LLL yyyy')
    }), { width: WIDTH, height: HEIGHT, fonts: satoriFonts })

    const png = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } }).render().asPng()
    fs.writeFileSync(target, png)
    generated++
  }

  if (generated > 0) {
    console.log(`[social-images] Generated ${generated} cover image${generated === 1 ? '' : 's'}`)
  }
}

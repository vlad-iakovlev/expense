import chalk from 'chalk'
import fs from 'fs'
import { Image } from 'imagescript'
import path from 'path'

const SRC_PATH = path.join(process.cwd(), './icons')
const DEST_PATH = path.join(process.cwd(), './public/icons')

const ICONS = {
  'icon.green': [192, 512],
  'icon.maskable': [192, 512],
}

void (async () => {
  try {
    for (const [name, sizes] of Object.entries(ICONS)) {
      for (const size of sizes) {
        const src = path.join(SRC_PATH, `${name}.svg`)
        const dest = path.join(DEST_PATH, `${name}.${size}.png`)

        const iconSvg = await fs.promises.readFile(src, 'utf-8')
        const icon = await Image.renderSVG(iconSvg, size, Image.SVG_MODE_WIDTH)
        const iconPng = await icon.encode()
        await fs.promises.writeFile(dest, iconPng)

        console.log(
          chalk.green.bold(`[${name}.svg]`),
          `Generated ${name}.${size}.png`
        )
      }
    }

    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()

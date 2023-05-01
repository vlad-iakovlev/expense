import assert from 'assert'
import chalk from 'chalk'
import fs from 'fs'
import fetch from 'node-fetch'
import * as html from 'node-html-parser'
import path from 'path'
import sharp from 'sharp'

const LAYOUT_DOCS_URL =
  'https://developer.apple.com/design/human-interface-guidelines/foundations/layout/'

const SCREEN_SIZES_SELECTOR =
  '#device-screen-sizes-and-orientations + table tbody tr td:nth-child(2)'

// Parses strings like '1024x1366 pt (2048x2732 px @2x)'
const SCREEN_SIZE_REGEX = /(\d+)x(\d+) pt \((\d+)x(\d+) px @(\d+)x\)/

const ICON_PATH = 'icons/icon-white.svg'
const ICON_SIZE = Math.floor(512 * 0.6)
const BG_COLOR = '#16a34aff'

interface ScreenSize {
  dpWidth: number
  dpHeight: number
  pxWidth: number
  pxHeight: number
  ratio: number
}

const getScreenSizes = async (): Promise<ScreenSize[]> => {
  return html
    .parse(await fetch(LAYOUT_DOCS_URL).then((res) => res.text()))
    .querySelectorAll(SCREEN_SIZES_SELECTOR)
    .map((el) => el.text)
    .filter((item, index, array) => array.indexOf(item) === index)
    .map<ScreenSize>((text) => {
      const result = text.match(SCREEN_SIZE_REGEX)
      assert(result?.length === 6, `Invalid screen size: ${text}`)

      return {
        dpWidth: Number(result[1]),
        dpHeight: Number(result[2]),
        pxWidth: Number(result[3]),
        pxHeight: Number(result[4]),
        ratio: Number(result[5]),
      }
    })
}

const getSplashPath = (width: number, height: number): string => {
  return `/splash/apple-splash-${width}-${height}.png`
}

const getXmlLine = (
  screenSize: ScreenSize,
  orientation: 'portrait' | 'landscape',
  splashPath: string
): string => {
  const media = [
    `(device-width: ${screenSize.dpWidth}px)`,
    `(device-height: ${screenSize.dpHeight}px)`,
    `(-webkit-device-pixel-ratio: ${screenSize.ratio})`,
    `(orientation: ${orientation})`,
  ].join(' and ')

  return `<link rel="apple-touch-startup-image" href="${splashPath}" media="${media}" />`
}

const getXml = (screenSizes: ScreenSize[]): string => {
  return screenSizes
    .map((screenSize) => [
      getXmlLine(
        screenSize,
        'portrait',
        getSplashPath(screenSize.pxWidth, screenSize.pxHeight)
      ),
      getXmlLine(
        screenSize,
        'landscape',
        getSplashPath(screenSize.pxHeight, screenSize.pxWidth)
      ),
    ])
    .flat()
    .join('\n')
}

const generateSplash = async (width: number, height: number) => {
  const srcPath = path.join(process.cwd(), ICON_PATH)
  const dstPath = path.join(
    process.cwd(),
    'public',
    getSplashPath(width, height)
  )

  await fs.promises.mkdir(path.dirname(dstPath), { recursive: true })

  const srcIcon = await sharp(srcPath)
    .resize({
      width: ICON_SIZE,
      height: ICON_SIZE,
      fit: 'contain',
    })
    .toBuffer()

  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: BG_COLOR,
    },
  })
    .composite([{ input: srcIcon }])
    .png()
    .toFile(dstPath)

  console.log(chalk.green.bold(`[${dstPath}]`), 'Generated')
}

void (async () => {
  try {
    const screenSizes = await getScreenSizes()
    console.log(screenSizes)

    for (const screenSize of screenSizes) {
      await generateSplash(screenSize.pxWidth, screenSize.pxHeight)
      await generateSplash(screenSize.pxHeight, screenSize.pxWidth)
    }

    console.log('')
    console.log(
      chalk.red.bold(
        'Update components/ApplePWA/ApplePWA.tsx with the following:'
      )
    )
    console.log(getXml(screenSizes))

    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()

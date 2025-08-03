import chalk from 'chalk'
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

interface ScreenSize {
  dpWidth: number
  dpHeight: number
  pxWidth: number
  pxHeight: number
  ratio: number
}

// See https://developer.apple.com/design/human-interface-guidelines/layout
const SCREEN_SIZES: ScreenSize[] = [
  {
    dpWidth: 1024,
    dpHeight: 1366,
    pxWidth: 2048,
    pxHeight: 2732,
    ratio: 2,
  },
  {
    dpWidth: 834,
    dpHeight: 1194,
    pxWidth: 1668,
    pxHeight: 2388,
    ratio: 2,
  },
  {
    dpWidth: 768,
    dpHeight: 1024,
    pxWidth: 1536,
    pxHeight: 2048,
    ratio: 2,
  },
  {
    dpWidth: 834,
    dpHeight: 1112,
    pxWidth: 1668,
    pxHeight: 2224,
    ratio: 2,
  },
  {
    dpWidth: 810,
    dpHeight: 1080,
    pxWidth: 1620,
    pxHeight: 2160,
    ratio: 2,
  },
  {
    dpWidth: 430,
    dpHeight: 932,
    pxWidth: 1290,
    pxHeight: 2796,
    ratio: 3,
  },
  {
    dpWidth: 393,
    dpHeight: 852,
    pxWidth: 1179,
    pxHeight: 2556,
    ratio: 3,
  },
  {
    dpWidth: 428,
    dpHeight: 926,
    pxWidth: 1284,
    pxHeight: 2778,
    ratio: 3,
  },
  {
    dpWidth: 390,
    dpHeight: 844,
    pxWidth: 1170,
    pxHeight: 2532,
    ratio: 3,
  },
  {
    dpWidth: 375,
    dpHeight: 812,
    pxWidth: 1125,
    pxHeight: 2436,
    ratio: 3,
  },
  {
    dpWidth: 414,
    dpHeight: 896,
    pxWidth: 1242,
    pxHeight: 2688,
    ratio: 3,
  },
  {
    dpWidth: 414,
    dpHeight: 896,
    pxWidth: 828,
    pxHeight: 1792,
    ratio: 2,
  },
  {
    dpWidth: 414,
    dpHeight: 736,
    pxWidth: 1080,
    pxHeight: 1920,
    ratio: 3,
  },
  {
    dpWidth: 375,
    dpHeight: 667,
    pxWidth: 750,
    pxHeight: 1334,
    ratio: 2,
  },
  {
    dpWidth: 320,
    dpHeight: 568,
    pxWidth: 640,
    pxHeight: 1136,
    ratio: 2,
  },
]

const ICON_PATH = 'icons/icon-white.svg'
const ICON_SIZE = Math.floor(512 * 0.6)
const BG_COLOR = '#15803dff'

const getSplashPath = (width: number, height: number): string =>
  `/splash/apple-splash-${width}-${height}.png`

const generateSplash = async (width: number, height: number) => {
  const srcPath = path.join(process.cwd(), ICON_PATH)
  const dstPath = path.join(
    process.cwd(),
    'public',
    getSplashPath(width, height),
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

const getSplashMedia = (
  screenSize: ScreenSize,
  orientation: 'portrait' | 'landscape',
): string =>
  [
    `(device-width: ${screenSize.dpWidth}px)`,
    `(device-height: ${screenSize.dpHeight}px)`,
    `(-webkit-device-pixel-ratio: ${screenSize.ratio})`,
    `(orientation: ${orientation})`,
  ].join(' and ')

const generateSplashesJson = async (screenSizes: ScreenSize[]) => {
  const dstPath = path.join(process.cwd(), 'splashes.json')

  const splashesJson = screenSizes
    .map((screenSize) => [
      {
        url: getSplashPath(screenSize.pxWidth, screenSize.pxHeight),
        media: getSplashMedia(screenSize, 'portrait'),
      },
      {
        url: getSplashPath(screenSize.pxHeight, screenSize.pxWidth),
        media: getSplashMedia(screenSize, 'landscape'),
      },
    ])
    .flat()

  await fs.promises.writeFile(dstPath, JSON.stringify(splashesJson, null, 2))

  console.log(chalk.green.bold(`[${dstPath}]`), 'Generated')
}

for (const screenSize of SCREEN_SIZES) {
  await generateSplash(screenSize.pxWidth, screenSize.pxHeight)
  await generateSplash(screenSize.pxHeight, screenSize.pxWidth)
}

await generateSplashesJson(SCREEN_SIZES)

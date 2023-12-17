import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

interface Icon {
  srcPath: string
  dstPath: string
  srcSize: number
  dstSize: number
  background: string
}

const generateIcon = async (icon: Icon) => {
  const srcPath = path.join(process.cwd(), icon.srcPath)
  const dstPath = path.join(process.cwd(), 'public', icon.dstPath)

  await fs.promises.mkdir(path.dirname(dstPath), { recursive: true })

  const srcIcon = await sharp(srcPath)
    .resize({
      width: icon.srcSize,
      height: icon.srcSize,
      fit: 'contain',
    })
    .toBuffer()

  await sharp({
    create: {
      width: icon.dstSize,
      height: icon.dstSize,
      channels: 4,
      background: icon.background,
    },
  })
    .composite([{ input: srcIcon }])
    .png()
    .toFile(dstPath)

  console.log(
    chalk.green.bold(`[${icon.srcPath} => ${icon.dstPath}]`),
    'Generated',
  )
}

void (async () => {
  try {
    await generateIcon({
      srcPath: 'icons/icon-green.svg',
      dstPath: 'icons/favicon.png',
      srcSize: 32,
      dstSize: 32,
      background: '#00000000',
    })

    await generateIcon({
      srcPath: 'icons/icon-green.svg',
      dstPath: 'icons/icon-192.png',
      srcSize: 192,
      dstSize: 192,
      background: '#00000000',
    })

    await generateIcon({
      srcPath: 'icons/icon-green.svg',
      dstPath: 'icons/icon-512.png',
      srcSize: 512,
      dstSize: 512,
      background: '#00000000',
    })

    await generateIcon({
      srcPath: 'icons/icon-white.svg',
      dstPath: 'icons/icon-192-maskable.png',
      srcSize: Math.floor(192 * 0.6),
      dstSize: 192,
      background: '#15803dff',
    })

    await generateIcon({
      srcPath: 'icons/icon-white.svg',
      dstPath: 'icons/icon-512-maskable.png',
      srcSize: Math.floor(512 * 0.6),
      dstSize: 512,
      background: '#15803dff',
    })

    await generateIcon({
      srcPath: 'icons/icon-white.svg',
      dstPath: 'icons/apple-touch-icon.png',
      srcSize: Math.floor(180 * 0.75),
      dstSize: 180,
      background: '#15803dff',
    })

    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()

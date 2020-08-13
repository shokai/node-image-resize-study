// https://www.npmjs.com/package/sharp

const fs = require('fs').promises
const path = require('path')
const sharp = require('sharp')

async function main () {
  let [ , , srcPath, destPath] = process.argv
  if (!destPath) {
    destPath = path.parse(srcPath).base
  }

  console.log('source', srcPath)
  try {
    const srcImg = sharp(srcPath)
    const {width, height} = await srcImg.metadata()
    console.log({width, height})
    if (width > 400 || height > 400) {
      console.log('resize')
      await srcImg.resize(400).toFile(destPath)
    } else {
      console.log('copy')
      await fs.copyFile(srcPath, destPath)
    }
    console.log('done')
  } catch (err) {
    console.error(err)
  }
}

main()


// https://www.npmjs.com/package/sharp

const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const createResizeStream = () => sharp()
  .rotate() // remove Exif Orientation and fix data
  .resize(1000, 1000, {
    fit: 'inside',
    withoutEnlargement: true, // https://sharp.pixelplumbing.com/api-resize#resize
    //kernel: 'nearest'
    kernel: 'lanczos3'
  })

async function main () {
  let [ , , srcPath, destPath] = process.argv
  if (!destPath) {
    destPath = path.parse(srcPath).base
  }

  console.log('source', srcPath)

  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(srcPath)
    const writeStream = fs.createWriteStream(destPath)
    readStream.pipe(createResizeStream()).pipe(writeStream)
    writeStream
      .once('error', reject)
      .once('finish', resolve)
  })
}

main().catch(console.error)


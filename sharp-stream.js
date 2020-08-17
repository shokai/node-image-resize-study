// https://www.npmjs.com/package/sharp

const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

async function main () {
  let [ , , srcPath, destPath] = process.argv
  if (!destPath) {
    destPath = path.parse(srcPath).base
  }

  console.log('source', srcPath)

  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(srcPath)
    const writeStream = fs.createWriteStream(destPath)
    const resize = sharp()
      .rotate() // https://sharp.pixelplumbing.com/api-operation#rotate
      .resize(400, null, { withoutEnlargement: true }) // https://sharp.pixelplumbing.com/api-resize#resize
    readStream.pipe(resize).pipe(writeStream)
    writeStream
      .once('error', reject)
      .once('finish', resolve)
  })
}

main().catch(console.error)


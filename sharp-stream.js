// https://www.npmjs.com/package/sharp

const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const resize = sharp().resize(400, null, { withoutEnlargement: true })

async function main () {
  let [ , , srcPath, destPath] = process.argv
  if (!destPath) {
    destPath = path.parse(srcPath).base
  }

  console.log('source', srcPath)

  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(srcPath)
    const writeStream = fs.createWriteStream(destPath)
    readStream.pipe(resize).pipe(writeStream)
    writeStream
      .once('error', reject)
      .once('finish', resolve)
  })
}

main().catch(console.error)

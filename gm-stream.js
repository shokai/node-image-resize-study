const fs = require('fs')
const path = require('path')
const gm = require('gm').subClass({imageMagick: true})

async function main () {
  let [ , , srcPath, destPath] = process.argv
  if (!destPath) {
    destPath = path.parse(srcPath).base
  }

  console.log('source', srcPath)
  const readStream = fs.createReadStream(srcPath)
  const writeStream = fs.createWriteStream(destPath)
  gm(readStream)
    .resize(1000, 1000, '>')
    .stream()
    .pipe(writeStream)
}

main().catch(console.error)


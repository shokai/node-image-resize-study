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
  const srcImg = sharp(srcPath)
  await srcImg.resize(1000, 1000, {
    fit: 'inside',
    withoutEnlargement: true,
    //kernel: 'nearest'
    kernel: 'lanczos3'
  }).toFile(destPath)
}

main().catch(console.error)

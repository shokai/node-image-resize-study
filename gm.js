const fs = require('fs').promises
const path = require('path')
const gm = require('gm').subClass({imageMagick: true})

const getSize = src => new Promise((resolve, reject) => {
  gm(src).size((err, value) => {
    if (err) return reject(err)
    resolve(value)
  })
})

const resize = (src, dest) => new Promise((resolve, reject) => {
  gm(src).resize(400, 400).write(dest, (err, stdout) => {
    if (err) return reject(err)
    resolve()
  })
})

async function main () {
  let [ , , srcPath, destPath] = process.argv
  if (!destPath) {
    destPath = path.parse(srcPath).base
  }

  console.log('source', srcPath)
  try {
    const {width, height} = await getSize(srcPath)
    console.log({width, height})
    if (width > 400 || height > 400) {
      console.log('resize')
      await resize(srcPath, destPath)
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


const fs = require('fs')
const pathsConfig = require('../configs/paths.json')

const { foldersToCopy, foldersToRemove, copyToStarterKit, copyRecursiveSync, copyContentToViews } = require('./helpers')

const generateStarterKit = () => {
  // ** Copy Folders
  foldersToCopy.forEach(f => {
    copyRecursiveSync(f, `${pathsConfig.starterKitPath}/${f.replace('../../', '')}`)
  })

  // ** Remove unwanted folders
  foldersToRemove.forEach(f => {
    fs.rmSync(f, { recursive: true, force: true })
  })

  // ** Copy updated Files to starterKit
  copyToStarterKit.forEach(f => {
    copyRecursiveSync(f.from, f.to)
  })

  // ** Update Views Folder
  if (fs.existsSync(`${pathsConfig.starterKitPath}/src/views`)) {
    fs.rmSync(`${pathsConfig.starterKitPath}/src/views`, { recursive: true, force: true }, err => {
      if (err) {
        console.log(err)
      } else {
        copyContentToViews.forEach(f => {
          copyRecursiveSync(f.from, f.to)
        })
      }
    })
  } else {
    fs.mkdir(`${pathsConfig.starterKitPath}/src/views`, err => {
      if (err) {
        console.log(err)
      } else {
        copyContentToViews.forEach(f => {
          copyRecursiveSync(f.from, f.to)
        })
      }
    })
  }
}

// ** Generate StarterKit
if (fs.existsSync(pathsConfig.starterKitPath)) {
  fs.rm(pathsConfig.starterKitPath, { recursive: true, force: true }, err => {
    if (err) {
      console.log(err)
    } else {
      generateStarterKit()
    }
  })
} else {
  generateStarterKit()
}

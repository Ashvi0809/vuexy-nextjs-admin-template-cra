const fs = require('fs')
const pathsConfig = require('../configs/paths.json')
const { dataToReplace, imagesToKeep, cleanEmptyFoldersRecursively } = require('./helpers')


dataToReplace.forEach(obj => {
  if (fs.existsSync(obj.file)) {
    fs.readFile(obj.file, 'utf-8', (err, data) => {
      if (err) {
        console.log(err)
      } else {
        let result = data
        obj.replacements.forEach(rep => {
          result = result.replace(rep.from, rep.to)
        })
        fs.writeFile(obj.file, '', err => {
          if (err) {
            console.log(err)
          } else {
            fs.writeFile(obj.file, result, err => {
              if (err) {
                console.log(err)
              }
            })
          }
        })
      }
    })
  }
})


  /* eslint-disable */
const removeUnwantedImgFiles = dirPath => {
  files = fs.readdirSync(dirPath)

  files.forEach(function (file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      removeUnwantedImgFiles(dirPath + '/' + file)
    } else {
      const imagePath = dirPath + '/' + file
      const imageToKeep = imagePath.substring(
        imagePath.lastIndexOf('images') - 1
      )
      if (!imagesToKeep.includes(imageToKeep)) {
        fs.rmSync(imagePath)
      }
    }
  })

  cleanEmptyFoldersRecursively(dirPath)
}

removeUnwantedImgFiles(`${pathsConfig.starterKitPath}/src/assets/images`)

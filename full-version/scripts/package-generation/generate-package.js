const fs = require('fs')
const pathsConfig = require('../configs/paths.json')

const { foldersToCopy, copyRecursiveSync, dataToReplace } = require('./helpers')

const generatePackage = () => {
  // ** Copy Folders
  foldersToCopy.forEach(f => {
    copyRecursiveSync(f, `${pathsConfig.packagePath}/full-version/${f.replace('../../', '')}`)
  })

  // ** Replace content in files
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

  // ** Copy Base SCSS
  if (fs.existsSync('../../../vuexy-html-template/src/scss')) {
    copyRecursiveSync(
      '../../../vuexy-html-template/src/scss',
      `${pathsConfig.packagePath}/full-version/src/@core/scss/base`
    )
  }
}

if (fs.existsSync(pathsConfig.packagePath)) {
  fs.rm(pathsConfig.packagePath, { recursive: true, force: true }, err => {
    if (err) {
      console.log(err)
    } else {
      generatePackage()
    }
  })
} else {
  generatePackage()
}

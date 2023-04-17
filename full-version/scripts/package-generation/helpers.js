const fs = require('fs')
const path = require('path')
const pathsConfig = require('../configs/paths.json')

const foldersToCopy = [
  `${pathsConfig.fullVersionPath}public`,
  `${pathsConfig.fullVersionPath}src`,
  `${pathsConfig.fullVersionPath}.env`,
  `${pathsConfig.fullVersionPath}.eslintrc.js`,
  `${pathsConfig.fullVersionPath}.gitignore`,
  `${pathsConfig.fullVersionPath}craco.config.js`,
  `${pathsConfig.fullVersionPath}package.json`,
  `${pathsConfig.fullVersionPath}yarn.lock`
]

const dataToReplace = [
  {
    file: `${pathsConfig.packagePath}/full-version/src/@core/layouts/VerticalLayout.js`,
    replacements: [
      {
        from: "import BuyNow from './components/BuyNow'",
        to: ''
      },
      {
        from: '<BuyNow />',
        to: ''
      }
    ]
  },
  {
    file: `${pathsConfig.packagePath}/full-version/src/@core/layouts/HorizontalLayout.js`,
    replacements: [
      {
        from: "import BuyNow from './components/BuyNow'",
        to: ''
      },
      {
        from: '<BuyNow />',
        to: ''
      }
    ]
  },
  {
    file: `${pathsConfig.packagePath}/full-version/src/configs/themeConfig.js`,
    replacements: [
      {
        from: 'customizer: true',
        to: 'customizer: false'
      }
    ]
  }
]

const copyRecursiveSync = (src, dest) => {
  const exists = fs.existsSync(src)
  const stats = exists && fs.statSync(src)
  const isDirectory = exists && stats.isDirectory()
  if (isDirectory) {
    // eslint-disable-next-line no-unused-expressions
    !fs.existsSync(dest) ? fs.mkdirSync(dest, { recursive: true, force: true }) : null
    fs.readdirSync(src).forEach(function (childItemName) {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName))
    })
  } else {
    fs.copyFileSync(src, dest)
  }
}

module.exports = {
  foldersToCopy,
  dataToReplace,
  copyRecursiveSync
}

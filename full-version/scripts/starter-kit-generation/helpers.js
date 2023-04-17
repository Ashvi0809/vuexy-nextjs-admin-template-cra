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
  `${pathsConfig.fullVersionPath}package.json`
]

const foldersToRemove = [
  `${pathsConfig.starterKitPath}/src/auth`,
  `${pathsConfig.starterKitPath}/src/views`,
  `${pathsConfig.starterKitPath}/src/router`,
  `${pathsConfig.starterKitPath}/src/@fake-db`,
  `${pathsConfig.starterKitPath}/src/navigation`,
  `${pathsConfig.starterKitPath}/src/configs/acl`,
  `${pathsConfig.starterKitPath}/src/configs/i18n`,
  `${pathsConfig.starterKitPath}/src/redux/authentication.js`,
  `${pathsConfig.starterKitPath}/src/@core/layouts/components/BuyNow.js`
]

const copyToStarterKit = [
  {
    from: './components/navigation',
    to: `${pathsConfig.starterKitPath}/src/navigation`
  },
  {
    from: './components/router',
    to: `${pathsConfig.starterKitPath}/src/router`
  }
]

const copyContentToViews = [
  {
    from: `${pathsConfig.fullVersionPath}src/views/pages/authentication/RegisterCover.js`,
    to: `${pathsConfig.starterKitPath}/src/views/Register.js`
  },
  {
    from: `${pathsConfig.fullVersionPath}src/views/pages/authentication/LoginCover.js`,
    to: `${pathsConfig.starterKitPath}/src/views/Login.js`
  },
  {
    from: `${pathsConfig.fullVersionPath}src/views/pages/authentication/ForgotPasswordCover.js`,
    to: `${pathsConfig.starterKitPath}/src/views/ForgotPassword.js`
  },
  {
    from: `${pathsConfig.fullVersionPath}src/views/pages/misc/Error.js`,
    to: `${pathsConfig.starterKitPath}/src/views/Error.js`
  },
  {
    from: `${pathsConfig.fullVersionPath}src/views/pages/misc/NotAuthorized.js`,
    to: `${pathsConfig.starterKitPath}/src/views/NotAuthorized.js`
  },
  {
    from: './components/views/Home.js',
    to: `${pathsConfig.starterKitPath}/src/views/Home.js`
  },
  {
    from: './components/views/SecondPage.js',
    to: `${pathsConfig.starterKitPath}/src/views/SecondPage.js`
  },
  {
    from: './components/@core/navbar/index.js',
    to: `${pathsConfig.starterKitPath}/src/@core/layouts/components/navbar/index.js`
  },
  {
    from: './components/@core/navbar/NavbarUser.js',
    to: `${pathsConfig.starterKitPath}/src/@core/layouts/components/navbar/NavbarUser.js`
  },
  {
    from: './components/@core/navbar/UserDropdown.js',
    to: `${pathsConfig.starterKitPath}/src/@core/layouts/components/navbar/UserDropdown.js`
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

const dataToReplace = [
  {
    file: `${pathsConfig.starterKitPath}/src/index.js`,
    replacements: [
      {
        from: 'Intl, CASL & ThemeColors Context',
        to: 'ThemeColors Context'
      },
      {
        from: "import ability from './configs/acl/ability'",
        to: ''
      },
      {
        from: "import { AbilityContext } from './utility/context/Can'",
        to: ''
      },
      {
        from: new RegExp(/\/\/ \*\* i18n/),
        to: ''
      },
      {
        from: "import './configs/i18n'",
        to: ''
      },
      {
        from: new RegExp(/\/\/ \*\* Fake Database/),
        to: ''
      },
      {
        from: "import './@fake-db'",
        to: ''
      },
      {
        from: '<AbilityContext.Provider value={ability}>',
        to: ''
      },
      {
        from: '</AbilityContext.Provider>',
        to: ''
      }
    ]
  },
  {
    file: `${pathsConfig.starterKitPath}/src/views/Login.js`,
    replacements: [
      {
        from: new RegExp('LoginCover', 'g'),
        to: 'Login'
      },
      {
        from: '/pages/forgot-password-cover',
        to: '/forgot-password'
      },
      {
        from: '/pages/register-cover',
        to: '/register'
      },
      {
        from: "<Button color='primary' block>",
        to: "<Button tag={Link} to='/' color='primary' block>"
      }
    ]
  },
  {
    file: `${pathsConfig.starterKitPath}/src/views/NotAuthorized.js`,
    replacements: [
      {
        from: 'getUserData, getHomeRouteForLoggedInUser',
        to: ''
      },

      {
        from: "user ? getHomeRouteForLoggedInUser(user.role) : '/'",
        to: "'/'"
      },
      {
        from: 'const user = getUserData()',
        to: ''
      },
      {
        from: new RegExp(/\/\/ \*\* Vars/),
        to: ''
      }
    ]
  },
  {
    file: `${pathsConfig.starterKitPath}/src/views/Register.js`,
    replacements: [
      {
        from: new RegExp('RegisterCover', 'g'),
        to: 'Register'
      },
      {
        from: '/pages/login-cover',
        to: '/login'
      },
      {
        from: "<Button color='primary' block>",
        to: "<Button tag={Link} to='/' color='primary' block>"
      }
    ]
  },
  {
    file: `${pathsConfig.starterKitPath}/src/views/ForgotPassword.js`,
    replacements: [
      {
        from: new RegExp('ForgotPasswordCover', 'g'),
        to: 'ForgotPassword'
      },
      {
        from: '/pages/login-cover',
        to: '/login'
      }
    ]
  },
  {
    file: `${pathsConfig.starterKitPath}/src/redux/rootReducer.js`,
    replacements: [
      {
        from: new RegExp(/import.*/, 'g'),
        to: ''
      },
      {
        from: new RegExp(/\/\/ \*\* Reducers Imports/),
        to: `${'/'}/ ** Reducers Imports \n import layout from './layout' \n import navbar from './navbar'`
      },
      {
        from: /{[\s\S]*?}/,
        to: '{ navbar, layout }'
      }
    ]
  },
  {
    file: `${pathsConfig.starterKitPath}/src/@core/layouts/components/menu/vertical-menu/VerticalNavMenuItems.js`,
    replacements: [
      {
        from: 'canViewMenuItem,',
        to: ''
      },
      {
        from: 'canViewMenuGroup,',
        to: ''
      },
      {
        from: new RegExp(/if (item.children) {[\s\S]*?key={item.id} {...props} \/>[\s\S]*?}/),
        to: ''
      },
      {
        from: 'canViewMenuItem(item) &&',
        to: ''
      }
    ]
  },
  {
    file: `${pathsConfig.starterKitPath}/src/@core/layouts/components/menu/horizontal-menu/HorizontalNavMenuItems.js`,
    replacements: [
      {
        from: 'canViewMenuItem',
        to: ''
      },
      {
        from: 'canViewMenuGroup,',
        to: ''
      },
      {
        from: new RegExp(/if (item.children) {[\s\S]*?key={item.id} {...props} \/>[\s\S]*?}/),
        to: ''
      },
      {
        from: 'canViewMenuItem(item) &&',
        to: ''
      }
    ]
  },
  {
    file: `${pathsConfig.starterKitPath}/src/@core/layouts/VerticalLayout.js`,
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
    file: `${pathsConfig.starterKitPath}/src/@core/layouts/HorizontalLayout.js`,
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
    file: `${pathsConfig.starterKitPath}/src/configs/themeConfig.js`,
    replacements: [
      {
        from: 'customizer: true',
        to: 'customizer: false'
      }
    ]
  }
]

const imagesToKeep = [
  '/images/logo/logo.svg',
  '/images/logo/logo.png',
  '/images/pages/error.svg',
  '/images/pages/login-v2.svg',
  '/images/pages/error-dark.svg',
  '/images/pages/register-v2.svg',
  '/images/pages/login-v2-dark.svg',
  '/images/pages/not-authorized.svg',
  '/images/pages/register-v2-dark.svg',
  '/images/pages/forgot-password-v2.svg',
  '/images/pages/not-authorized-dark.svg',
  '/images/portrait/small/avatar-s-11.jpg',
  '/images/pages/forgot-password-v2-dark.svg'
]

const cleanEmptyFoldersRecursively = folder => {
  const isDir = fs.statSync(folder).isDirectory()
  if (!isDir) {
    return
  }
  let files = fs.readdirSync(folder)
  if (files.length > 0) {
    files.forEach(function (file) {
      const fullPath = path.join(folder, file)
      cleanEmptyFoldersRecursively(fullPath)
    })
    files = fs.readdirSync(folder)
  }

  if (files.length === 0) {
    fs.rmdirSync(folder)
  }
}

module.exports = {
  imagesToKeep,
  foldersToCopy,
  dataToReplace,
  foldersToRemove,
  copyToStarterKit,
  copyRecursiveSync,
  copyContentToViews,
  cleanEmptyFoldersRecursively
}

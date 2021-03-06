// Configuration for your app

function extendTypescriptToWebpack(cfg) {
  // added the type-script supports
  cfg.resolve.extensions.push('.ts');
  cfg.module.rules.push({
    test: /\.ts$/,
    loader: 'ts-loader',
    options: {appendTsSuffixTo: [/\.vue$/]}
  })
}

module.exports = function (ctx) {
  // console.log(ctx)
  let distDir = `dist/@{ctx.modeName}`;
  if (ctx.prod) {
    distDir = '../annette-axon/axon-backend/public/dist'
  }
  console.log(distDir);
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'auth',
      'i18n',
      'axios',
      'validate',
    ],

    css: [
      'app.styl'
    ],

    extras: [
      'roboto-font',
      'material-icons', // optional, you are not bound to it
      // 'ionicons-v4',
      // 'mdi-v3',
      'fontawesome-v5',
      // 'eva-icons'
    ],

    // framework: 'all', // --- includes everything; for dev only!
    framework: {
      all: true,
      // components: [
      //   'QLayout',
      //   'QHeader',
      //   'QDrawer',
      //   'QPageContainer',
      //   'QPage',
      //   'QToolbar',
      //   'QToolbarTitle',
      //   'QBtn',
      //   'QIcon',
      //   'QList',
      //   'QItem',
      //   'QItemSection',
      //   'QItemLabel'
      // ],
      //
      directives: [
        'Ripple'
      ],

      // Quasar plugins
      plugins: [
        'Notify'
      ],

      // iconSet: 'fontawesome-v5',
      lang: 'ru'
    },

    supportIE: false,

    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack(cfg) {
        extendTypescriptToWebpack(cfg);
        // cfg.module.rules.push({
        //   enforce: 'pre',
        //   test: /\.(js)$/,
        //   loader: 'eslint-loader',
        //   exclude: /node_modules/
        // });
      },

      distDir: distDir,
      // publicPath: 'assets/dist/'
    },

    devServer: {
      // https: true,
      port: 4200,
      open: true, // opens browser window automatically
      host: '0.0.0.0',
      // contentBase: distDir,
      // Send API requests on localhost to API server get around CORS.
      proxy: {
          '/web-api': 'http://localhost:9000'
      },
    },

    // animations: 'all' --- includes all animations
    animations: [],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },

    cordova: {
      // id: 'org.cordova.quasar.app'
    },

    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack(cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
};

import pkg from './package'
import {
  async
} from 'q';


const glob = require('glob');
// we acquire an array containing the filenames
// in the articles directory
let files = glob.sync('**/*.md', {
  cwd: 'articles'
});

// We define a function to trim the '.md' from the filename
// and return the correct path.
// This function will be used later
function getSlugs(post, _) {
  let slug = post.substr(0, post.lastIndexOf('.'));
  return `/blog/${slug}`;
}

export default {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {

    script: [{
        src: ' https://unpkg.com/applause-button/dist/applause-button.js'
      },
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js',
        body: true,
        async: true

      },
      {
        src: 'https://rawcdn.githack.com/mburakerman/prognroll/0feda211643153bce2c69de32ea1b39cdc64ffbe/src/prognroll.js',
        body: true,
        async: true

      },
      {
        src: '/easescroll.js',
        body: true,
        async: true

      },

      {
        src: '/main.js',
        defer: true,
        body: true,
        async: true
      }

    ],

    title: pkg.name,
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },

      {
        name: 'theme-color',
        content: '#fc3a52'
      },

      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ],
    link: [{
        iconSrc: 'static/icon.png',
        rel: 'icon',
        type: 'image/x-icon',
        href: 'favicon.ico',
      },
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/applause-button/dist/applause-button.css'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fc3a52;',
    throttle: 0
  },

  /*
   ** Global CSS
   */
  css: [
    '@assets/css/main.css',

  ],



  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{
      src: '~/plugins/rellax',
      ssr: false
    },
    {
      src: "~/plugins/aos",
      ssr: false
    },
    {
      src: "~/plugins/medium-zoom",
      ssr: false
    },
    {
      src: "~/plugins/vue-agile",
      ssr: false
    },
    {
      src: '~/plugins/scrollmagic',
      ssr: false

    }

  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/moment',

    ['@nuxtjs/google-analytics', {
      id: 'UA-138976237-1'
    }],
    '@bazzite/nuxt-optimized-images',
    '@nuxtjs/sitemap'
  ],
  optimizedImages: {
    inlineImageLimit: -1,
    handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
    optimizeImages: false,
    optimizeImagesInDev: false,
    defaultImageLoader: 'img-loader',
    mozjpeg: {
      quality: 80
    },
    optipng: true,
    pngquant: {
      speed: 7,
      quality: [0.65, 0.8]
    },
    webp: {
      preset: 'default',
      quality: 85
    }
  },

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  generate: {
    routes: function () {
      return files.map(getSlugs)
    }
  },






  /*
   ** Build configuration
   */
  build: {

    extend(config, ctx) {
      config.module.rules.push({
        test: /\.md$/,
        use: ['raw-loader']
      });
      config.node = {
        fs: "empty",
        glob: "empty"
      };


      /*
       ** You can extend webpack config here
       */
      // alias: { //Seção Alias
      //   ScrollMagicGSAP: "scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap"

      // Run ESLint on save
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/,
      //     options: {
      //       fix: true
      //     }
      //   })
      // }
    }
  }
}

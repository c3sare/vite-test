import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  /////////////////////////////////////////////////////////////////////////
  /// SHARED OPTIONS //////////////////////////////////////////////////////
  root: "./public/index.html",
  base: "/", // base url
  mode: "development", // or 'production' or as parameter --mode=production
  plugins: [], // array of vite plugins
  publicDir: "public", // name of folder with static assets default=public
  cacheDir: "node_modules/.vite", // name of folder with cache default=.vite
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // alias for import like - improt page from "@/page"
    },
    dedupe: ["react", "react-dom"], // is using one version of this packages by reducting duplicates used in other packages
    conditions: [], // array of priority for resolving modules first is for browser - ['browser', 'import', 'module', 'default']
    // package.json fragment for src/components/Button/index.js
    // exports: {
    //   ".": "./index.js",
    //   "./feature.js": {
    //     node: "./feature-node.js",
    //     default: "./feature.js",
    //   },
    // },
    mainFields: [], // like upper, prioritetaizing packages for difrrent use enviroments node.js vs browser
    extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"], // array of extensions to omit file extensions in import -- import component from "component" -- not component.js default: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']
    preserveSymlinks: false, // allow use symlinks packages rewrites node_modules folder to packages folder
  },
  html: {
    // cspNonce: "nonce" //placeholder used when generating script /style tags
  },
  //css: {
  //     modules: {
  //         // postcss-modules configuration
  //     }
  // postcss: {
  //postcss.config.js inline configuration
  //}
  //preprocessorOptions: {
  //
  //}
  //}
  json: {
    namedExports: true, //support importing .json files,
    stringify: false, // support to import and auto parse .json files
  },
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
    jsxInject: "import React from 'react'",
  }, // apply esbuild configuration
  assetsInclude: [], // add additional assets to import ["**/*.glb"],
  logLevel: "info", // level of listed output in console default=info other options = warn, error, silent
  //customLogger: () => void //custom logger function
  clearScreen: true, // clear console after start vite default=true
  envDir: ".env", // name of folder with env files default=.env
  envPrefix: "VITE_", // prefix for env variables used in client side default=VITE_
  appType: "spa", // type of application default=spa other options = mpa, custom
  ///////////////////////////////////////////////////////////////////////////////
  /// SERVER OPTIONS ////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  server: {
    host: "localhost", // speify ip addres host name - default=localhost
    port: 5173, // specify port number - default=5173
    strictPort: false, // use only specified port
    https: {}, // enable tls http/2
    open: false, // string or boolean - open browser after start default=false
    proxy: {
      // "/api": "http://localhost:3000",
      // "/api2": "http://localhost:3000",
      //   "/api": {
      //     target: "http://jsonplaceholder.typicode.com",
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, ""),
      //   },
    },
    cors: false, // boolean or {
    //origin: "*",
    //methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    //   "preflightContinue": false,
    //   "optionsSuccessStatus": 204
    //}
    headers: {
      // "Access-Control-Allow-Origin": "*",
      // Additional http headers
    },
    hmr: {
      // host: "localhost", // if hmr works on other host
      // port: 3000, // if hmr works on other port
      // overlay: true, // show overlay when error occurs
      // protocol: "ws", // or "wss"
      // clientPort: 443 // used with proxy server
    },
    warmup: {
      clientFiles: [], //['./src/components/*.vue', './src/utils/big-utils.js'] - used in client components
      ssrFiles: [], // ['./src/server/modules/*.js'] - used in server rendered files
      // Make sure there are often used files only to not overuse the server
    },
    watch: {
      ignored: [], // array of files or directories to ignore to watch for changes
      persistent: true, // keep server running after file changes
      usePolling: true, // use polling instead of native watchers if cpu utilization is high turn it of
    },
    middlewareMode: false, // defult=false create vite server in middleware mode , needed to SSR
  },
});

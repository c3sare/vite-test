import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  /////////////////////////////////////////////////////////////////////////
  /// SHARED OPTIONS //////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
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
    fs: {
      strict: true, // restrict to public files out of root workspace default=true since vite 2.7
      allow: [], // restrict serving files when upper is true = ['..']
      deny: [], // like upper but restricting acces to files on list default=['.env', '.env.*', '*.{crt,pem}']
      cachedChecks: false, // EXPERIMENTAL, bufforing files of accessed dirs to avoid repeated filesystem operations
    },
    // origin: "http://127.0.0.1:8080", //Defines origin of the generated asset URLs during development
    sourcemapIgnoreList(sourcePath, sourcemapPath) {
      return sourcePath.includes("node_modules"); // This is the default value, and will add all files with node_modules in their paths to the ignore list.
    },
  },
  ///////////////////////////////////////////////////////////////////////////////
  // BUILD //////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  build: {
    target: "modules", // browser compatiblity defaul=modules --- ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'], "esnext" - special value, using native dynamic import
    // if build.minify=terser and terser is instaled below v5.16.0 - esnext will force down to es2021
    modulePreload: {
      polyfill: true, // default polyfill=true (boolean or {polyfill?: boolean, resolveDependencies?: fn})
    },
    outDir: "dist", // output directory default=dist
    assetsDir: "assets", //output of generated assets (relative to build.outDir), not used in library mode
    assetsInlineLimit: 4096, //default=4096 - files below this value are injected as base64 string to avoid unnecessery fetch's
    cssCodeSplit: true, // default=true - split css code imported in async js chunks, if disabled then makes a single css file
    cssTarget: [], //default=same value as build.target, transpiling css to older browsers in array specified browser and version like build.target
    cssMinify: "esbuild", // changing default code minification default=same value from build.minify
    sourcemap: false, //generate source map - boolean - as file | "inline" - in html file | "hidden" - commentet

    rollupOptions: {},
  },
});

import { resolve } from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
// import legacy from "@vitejs/plugin-legacy"

const pathResolve = (pathStr: string): string => {
  return resolve(__dirname, ".", pathStr);
}

export default defineConfig({
  plugins: [
    vue(),
    // legacy({
    //   targets: ["defaults", "not IE 11"],
    //   // targets: ["ie >= 11"],
    //   // additionalLegacyPolyfills: ["regenerator-runtime/runtime"]  
    // })
  ],
  root: process.cwd(),
  base: "/",
  mode: "development",
  define: [],
  publicDir: "public",
  cacheDir: "node_modules/.vite",
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, './src') },
    ],
    dedupe: [],
    conditions: [],
    mainFields: ["module", "jsnext:main", "jsnext"],
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"]
  },
  css: {
    modules: {},
    postcss: {},
    preprocessorOptions: {
      scss: {
        additionalData: `@import './src/assets/scss/index.scss';`
      },
    }
  },
  json: {
    namedExports: true,
    stringify: false
  },
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
    // jsxInject: `import React from 'react'`
  },
  assetsInclude: "",
  logLevel: "info",
  clearScreen: false,

  server: {
    host: "127.0.0.1",
    port: 8580,
    strictPort: false,
    https: false,
    open: false,
    proxy: {
      "^/api/.*": {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    },
    cors: true,
    force: true,
    hmr: true,
    watch: {},
    middlewareMode: false,
    fsServe: {
      strict: false,
      root: ".."
    }
  },

  build: {
    target: "modules",
    polyfillDynamicImport: false,
    outDir: "docs",
    assetsDir: "assets",
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html")
      }
    },
    commonjsOptions: {},
    lib: false,
    manifest: false,
    minify: "terser",
    terserOptions: {},
    cleanCssOptions: {},
    write: true,
    emptyOutDir: true,
    brotliSize: true,
    chunkSizeWarningLimit: 500,
    watch: null
  },

  optimizeDeps: {
    entries: [],
    exclude: [],
    include: [],
    keepNames: false
  },
  // ssr: {
  //   external: [],
  //   noExternal: [],
  //   target: "node"
  // }
})


import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// const path = require('path')
// import path from 'path'
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_APP_BASE } = env;
  const config = {
    base: VITE_APP_BASE,
    plugins: [
      vue(),
    ],
    server: {
      host: true,
      proxy: {
        '/api': {
          // target: 'http://localhost',
          target: 'http://172.26.216.111:8180',
          // target: 'http://njzj-zljy-gateway.dev.zxwis.com:80',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        }
      }
    },
    resolve: {
      alias: {
        '~': resolve(__dirname, './'),
        '@': resolve(__dirname, './src'),
        components: resolve(__dirname, './src/components'),
        styles: resolve(__dirname, './src/styles'),
        utils: resolve(__dirname, './src/utils'),
      },
    },
  }
  if (mode == 'lib') {
    config.build = {
      cssCodeSplit: true,
      outDir: 'lib',
      lib: {
        entry: resolve(__dirname, 'packages/index.js'),
        name: 'kh-region',
        formats: ['umd'],
        fileName: () => `kh-region.js`
      },
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ['vue', 'elementPlus'],
        output: {
          inlineDynamicImports: true,
          globals: {
            vue: 'Vue'
          }
        }
      }
    }
  }
  return config
})

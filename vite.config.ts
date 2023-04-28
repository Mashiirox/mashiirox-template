import { defineConfig } from 'vite';
import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

import svgoConfig from './svgo.config';

function _resolve(dir: string) {
  return resolve(__dirname, dir);
}

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': _resolve('src'),
    },
  },
  plugins: [
    react(),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/icon')],
      svgoOptions: svgoConfig,
      symbolId: '[name]',
      inject: 'body-last',
      customDomId: '__svg__icons__dom__',
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 4396,
    https: false,
  },
});

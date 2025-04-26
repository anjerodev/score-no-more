import { ManifestV3Export } from '@crxjs/vite-plugin'
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { BuildOptions, defineConfig } from 'vite'

import manifest from './manifest.json' with { type: 'json' }
import pkg from './package.json'

export const baseManifest = {
  ...manifest,
  version: pkg.version,
} as ManifestV3Export

export const baseBuildOptions: BuildOptions = {
  sourcemap: false,
  emptyOutDir: true,
}

export default defineConfig({
  plugins: [tailwindcss(), preact()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})

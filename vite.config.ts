import { ManifestV3Export, chromeExtension } from '@crxjs/vite-plugin'
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { BuildOptions, defineConfig } from 'vite'

import manifest from './manifest.json' with { type: 'json' }
import pkg from './package.json'

const baseManifest = {
  ...manifest,
  version: pkg.version,
} as ManifestV3Export

const baseBuildOptions: BuildOptions = {
  sourcemap: false,
  emptyOutDir: true,
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    preact(),
    chromeExtension({
      manifest: {
        ...baseManifest,
        background: {
          service_worker: 'src/background.ts',
          type: 'module',
        },
      } as ManifestV3Export,
      contentScripts: {
        injectCss: true,
      },
    }),
  ],
  build: {
    ...baseBuildOptions,
    outDir: resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})

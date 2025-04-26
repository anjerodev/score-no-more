import { ManifestV3Export, crx } from '@crxjs/vite-plugin'
import { resolve } from 'path'
import { defineConfig, mergeConfig } from 'vite'

import baseConfig, { baseBuildOptions, baseManifest } from './vite.config'

const outDir = resolve(__dirname, 'dist_chrome')

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [
      crx({
        manifest: {
          ...baseManifest,
          background: {
            service_worker: 'src/background.ts',
            type: 'module',
          },
        } as ManifestV3Export,
        browser: 'chrome',
        contentScripts: {
          injectCss: true,
        },
      }),
    ],
    build: {
      ...baseBuildOptions,
      outDir,
    },
  })
)

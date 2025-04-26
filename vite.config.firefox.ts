import { ManifestV3Export, crx } from '@crxjs/vite-plugin'
import { resolve } from 'path'
import { defineConfig, mergeConfig } from 'vite'

import baseConfig, { baseBuildOptions, baseManifest } from './vite.config'

const outDir = resolve(__dirname, 'dist_firefox')

type FirefoxManifest = ManifestV3Export & {
  browser_specific_settings?: {
    gecko: {
      id?: string
      strict_min_version: string
    }
  }
}

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [
      crx({
        manifest: {
          ...baseManifest,
          background: {
            scripts: ['src/background.ts'],
          },
          browser_specific_settings: {
            gecko: {
              id: 'score-no-more@anjero.dev',
              strict_min_version: '109.0',
            },
          },
        } as FirefoxManifest,
        browser: 'firefox',
        contentScripts: {
          injectCss: true,
        },
      }),
    ],
    build: {
      ...baseBuildOptions,
      outDir,
    },
    publicDir: resolve(__dirname, 'public'),
  })
)

import fs from 'fs-extra'
import type { Manifest } from 'webextension-polyfill'
import type PkgType from '../package.json'
import { isDev, isFirefox, port, r } from '../scripts/utils'

export async function getManifest() {
  const pkg = await fs.readJSON(r('package.json')) as typeof PkgType

  const manifest: Manifest.WebExtensionManifest = {
    manifest_version: 3,
    name: 'Polar',
    version: pkg.version,
    description: pkg.description,
    action: {
      default_icon: './assets/Icon_128.png',
      default_popup: './dist/popup/index.html',
    },
    options_ui: {
      page: './dist/options/index.html',
      open_in_tab: true,
    },
    background: isFirefox
      ? {
          scripts: ['dist/background/index.mjs'],
          type: 'module',
        }
      : {
          service_worker: './dist/background/index.mjs',
        },
    icons: {
      16: './assets/Icon_16.png',
      48: './assets/Icon_48.png',
      128: './assets/Icon_128.png',
    },
    permissions: [
      // 'tabs',
      'storage',
      // 'activeTab',
      'webNavigation',
      'scripting',
    ],
    host_permissions: ['*://*/*'],
    content_scripts: [
      {
        // matches: ['<all_urls>'],
        matches: ['*'],
        js: ['dist/contentScripts/index.global.js'],
        // matches: [
        //   'https://github.com/*/*/issues',
        //   'https://github.com/*/*/issues?*',
        //   'https://github.com/*/*/issues/*',
        // ],
      },
    ],
    web_accessible_resources: [
      {
        resources: ['dist/contentScripts/style.css'],
        // matches: ['"https://github.com/*"'],
        matches: ['<all_urls>'],
      },
    ],
    content_security_policy: {
      extension_pages: isDev
        // this is required on dev for Vite script to load
        ? `script-src \'self\' http://localhost:${port}; object-src \'self\'`
        : 'script-src \'self\'; object-src \'self\'',
    },
  }

  if (isDev) {
    // for content script, as browsers will cache them for each reload,
    // we use a background script to always inject the latest version
    // see src/background/contentScriptHMR.ts
    delete manifest.content_scripts
    manifest.permissions?.push('webNavigation')
  }

  return manifest
}

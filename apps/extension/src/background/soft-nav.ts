// Reload content scripts on navigation to any of the pages that matches the original content script

// This makes sure that the extension is loaded when navigating to the issues pages
// from other pages when navigating in the SPA.
const contentListener = (e: any) => {
  console.log('Navigating on GitHub, reloading content script', {
    to: e.url,
    tabId: e.tabId,
  })

  browser.scripting
    .executeScript({
      files: ['dist/contentScripts/content.js'],
      target: { tabId: e.tabId },
    })
    .catch((e) => {
      console.error('Failed to re-execute content.js', e)
    })
}

// This makes sure that we pick up the auth token even if we're redirected back to
// the page after authenticating with GitHub.
const authListener = (e: any) => {
  console.log('Navigating to the token page, reloading content script', {
    to: e.url,
    tabId: e.tabId,
  })

  browser.scripting
    .executeScript({
      files: ['dist/contentScripts/auth.js'],
      target: { tabId: e.tabId },
    })
    .catch((e) => {
      console.error('Failed to re-execute auth.js', e)
    })
}

if (!browser.webNavigation.onHistoryStateUpdated.hasListener(contentListener)) {
  browser.webNavigation.onHistoryStateUpdated.addListener(contentListener, {
    url: [{ urlMatches: 'https://github.com/(.+)/(.+)/issues' }],
  })
}

if (!browser.webNavigation.onHistoryStateUpdated.hasListener(authListener)) {
  browser.webNavigation.onHistoryStateUpdated.addListener(authListener, {
    url: [{ pathEquals: '/settings/extension' }],
  })
}

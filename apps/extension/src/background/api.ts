import type { IssueExtensionRead, Platforms } from '@polar-sh/sdk'
import { CONFIG } from '~/config'
import { token } from '~/logic/storage'

const extensionVersion = browser.runtime.getManifest().version

export const isAuthenticated = async (): Promise<boolean> => {
  return !!(token.value)
}

browser.storage.local.onChanged.addListener(
  (changes) => {
    if (changes.token && changes.token.newValue)
      token.value = changes.token.newValue
  },
)

const listIssuesForExtension = async ({
  platform,
  orgName,
  repoName,
  numbers,
}: {
  platform: Platforms
  orgName: string
  repoName: string
  numbers: string
}): Promise<Array<IssueExtensionRead>> => {
  const response = await fetch(
    `${CONFIG.API_URL}/api/v1/extension/${platform}/${orgName}/${repoName}/issues?numbers=${numbers}`,
    {
      // If we do 'include' here instead, the cookie is included and we could scrap the entire
      // auth mechanism. Let's not for now.
      credentials: 'omit',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'X-Polar-Agent': `Polar-Extension/${extensionVersion}`,
      },
    },
  )
  /*
   * Always return an empty list of issues in case HTTP is not 200, e.g
   * unauthenticated, no issues for repo etc.
   */
  if (!response.ok)
    return []

  const body = await response.json()
  return body as Array<IssueExtensionRead>
}

export default {
  extension: { listIssuesForExtension },
}

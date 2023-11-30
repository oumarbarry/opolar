import { Platforms } from '@polar-sh/sdk'
import api from './api'

const apiRequestDecoration = async (
  orgName: string,
  repoName: string,
  issueNumbers: string[],
) => {
  const extensionIssues = await api.extension.listIssuesForExtension({
    platform: Platforms.GITHUB,
    orgName,
    repoName,
    numbers: issueNumbers.join(','),
  })

  // Add all the issues to browser.storage
  const itemsToAdd = {} as any
  extensionIssues.forEach((issue) => {
    const key = `issues_v2/${orgName}/${repoName}/${issue.number}`
    itemsToAdd[key] = issue as any
  })
  browser.storage.local.set(itemsToAdd)

  // Remove the issues we asked for but didn't get a response for from the cache
  const keysToRemove = issueNumbers.filter(
    issueNumber =>
      !extensionIssues.some(
        extensionIssue => extensionIssue.number.toString() === issueNumber,
      ),
  )
  browser.storage.local.remove(
    keysToRemove.map(key => `issues_v2/${orgName}/${repoName}/${key}`),
  )
}

browser.runtime.onMessage.addListener(async (message, _sender, _sendResponse) => {
  const { type, orgName, repoName, issueNumbers } = message

  if (type === 'decorate-issues') {
    await apiRequestDecoration(orgName, repoName, issueNumbers)
    return true
  }
})

export {}

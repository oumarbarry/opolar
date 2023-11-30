import type { Issue } from "@polar-sh/sdk"

export function githubIssueLink(issue: Issue) {
  return `https://github.com/${issue.repository.organization.name}/${issue.repository.name}/issues/${issue.number}`
}

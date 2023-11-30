interface GitHubIssue {
  raw: string
  owner: string
  repo: string
  number: number
}

export function githubRepoUrl(owner: string, repo: string) {
  return `https://github.com/${owner}/${repo}`
}

export function githubIssueUrl(owner: string, repo: string, number: number) {
  return `${githubRepoUrl(owner, repo)}/issues/${number}`
}

export function githubPullRequestUrl(owner: string, repo: string, number: number) {
  return `${githubRepoUrl(owner, repo)}/pull/${number}`
}

export function parseGitHubIssueLink(url: string): GitHubIssue | undefined {
  const re = /^(?<owner>[a-z0-9][a-z0-9-]*)?(?:\/(?<repo>[a-z0-9_\.-]+))?#(?<number>\d+)|(?:https?:\/\/(?:www\.)?github\.com\/)(?<owner2>[a-z0-9][a-z0-9-]*)?(?:\/(?<repo2>[a-z0-9_\.-]+))?(?:#|\/issues\/)(?<number2>\d+)(#.*)?$/i

  const match = url.match(re)

  if (!match || !match.groups) return

  return {
    raw: match[0],
    owner: match.groups.owner || match.groups.owner2,
    repo: match.groups.repo || match.groups.repo2,
    number: Number.parseInt(match.groups.number || match.groups.number2),
  }
}

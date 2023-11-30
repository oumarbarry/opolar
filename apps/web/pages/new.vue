<script setup lang="ts">
import { parseGitHubIssueLink } from "#imports"

useSeoMeta({ title: "Create a new pledge" })

const route = useRoute("new")

const link = route.query?.link ?? ""
let errorMessage = ""

if (link && typeof link === "string") {
  const issue = parseGitHubIssueLink(link)
  if (issue) navigateTo(`/${issue.owner}/${issue.repo}/issues/${issue.number}`)

  errorMessage = "Invalid GitHub issue link"
}
</script>

<template>
  <PledgeByLink :init-link-value="link" :init-error-message="errorMessage" />
</template>

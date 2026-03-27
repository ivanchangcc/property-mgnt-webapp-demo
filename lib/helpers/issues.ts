import type { Issue, IssueStatus } from "../types"

export function isOpenIssue(issue: Issue): boolean {
  return issue.status !== "completed" && issue.status !== "closed"
}

export function filterByStatus(
  issues: Issue[],
  status: IssueStatus
): Issue[] {
  return issues.filter((issue) => issue.status === status)
}

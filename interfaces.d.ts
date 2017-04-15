export interface BaseEvent {
    repository: Repository;
}
export interface PushEvent extends BaseEvent {
    ref: string; // The full Git ref that was pushed. Example: "refs/heads/master".
    head: string; // The SHA of the most recent commit on ref after the push.
    before: string; // The SHA of the most recent commit on ref before the push.
    size: number; // Integer. The number of commits in the push.
    distinct_size: number; // Integer. The number of distinct commits in the push.
    commits: Commit[];
}
export interface Repository {
    id: number; // Integer. The ID of the repository.
    name: string; // The name of the repository.
}
export interface Commit {
    sha: string; // 	The SHA of the commit.
    message: string; // The commit message.
    author: { // The git author of the commit.
        name: string; // The git author's name.
        email: string; // The git author's email address.
    }
    url: string; // Points to the commit API resource.
    distinct: boolean; // Whether this commit is distinct from any that have been pushed before.
}
export type Payload = PushEvent;
export type GitHubEvent =
    "*" //	Any time any event is triggered (Wildcard Event).
    | "commit_comment" //	Any time a Commit is commented on.
    | "create" //	Any time a Branch or Tag is created.
    | "delete" //	Any time a Branch or Tag is deleted.
    | "deployment" //	Any time a Repository has a new deployment created from the API.
    | "deployment_status" //	Any time a deployment for a Repository has a status update from the API.
    | "fork" //	Any time a Repository is forked.
    | "gollum" //	Any time a Wiki page is updated.
    | "issue_comment" //	Any time a comment on an issue is created, edited, or deleted.
    | "issues" //	Any time an Issue is assigned, unassigned, labeled, unlabeled, opened, edited, milestoned, demilestoned, closed, or reopened.
    | "label" //	Any time a Label is created, edited, or deleted.
    | "member" //	Any time a User is added or removed as a collaborator to a Repository, or has their permissions modified.
    | "membership" //	Any time a User is added or removed from a team. Organization hooks only.
    | "milestone" //	Any time a Milestone is created, closed, opened, edited, or deleted.
    | "organization" //	Any time a user is added, removed, or invited to an Organization. Organization hooks only.
    | "org_block" //	Any time an organization blocks or unblocks a user. Organization hooks only.
    | "page_build" //	Any time a Pages site is built or results in a failed build.
    | "project_card" //	Any time a Project Card is created, edited, moved, converted to an issue, or deleted.
    | "project_column" //	Any time a Project Column is created, edited, moved, or deleted.
    | "project" //	Any time a Project is created, edited, closed, reopened, or deleted.
    | "public" //	Any time a Repository changes from private to public.
    | "pull_request_review_comment" //	Any time a comment on a pull request's unified diff is created, edited, or deleted (in the Files Changed tab).
    | "pull_request_review" //	Any time a pull request review is submitted, edited, or dismissed.
    | "pull_request" //	Any time a pull request is assigned, unassigned, labeled, unlabeled, opened, edited, closed, reopened, or synchronized (updated due to a new push in the branch that the pull request is tracking). Also any time a pull request review is requested, or a review request is removed.
    | "push" //	Any Git push to a Repository, including editing tags or branches. Commits via API actions that update references are also counted. This is the default event.
    | "repository" //	Any time a Repository is created, deleted (organization hooks only), made public, or made private.
    | "release" //	Any time a Release is published in a Repository.
    | "status" //	Any time a Repository has a status update from the API
    | "team" //	Any time a team is created, deleted, modified, or added to or removed from a repository. Organization hooks only
    | "team_add" //	Any time a team is added or modified on a Repository.
    | "watch" // Any time a User stars a Repository.
    ;
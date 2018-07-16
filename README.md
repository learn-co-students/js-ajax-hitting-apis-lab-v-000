JavaScript GitHub API with XHR
---

## Objectives

1. Practice making HTTP requests with XHR
2. Practice doing things with XHR responses

## Introduction



## Instructions

1. Create a form with a `username` field that calls a `getRepositories` function that loads the
   `repositories` div with a list of public repositories for that
user. The displayed repositories should include the name and a link to
the URL (HTML URL, not API URL).
2. Add a link to each repository that calls a `getCommits` function on
   click and, when the request is complete, calls a `displayCommits`
function that fills the `details` div with a list of commits for that repository.
The display of commits should include the author's Github name, the
author's full name, and the commit message. Give the link data
attributes of `username` and `repository` to be used by the `getCommits`
function.
3. Add a link to each repository that calls a `getBranches` function
   when clicked and, when complete, calls a `displayBranches` function
that fills the `details` div with a list of names of each
branch of the repository. Give the link data attributes of `username` and
`repository` for use by the `getBranches` function.

## Resources

- [GitHub API](https://developer.github.com/v3/)

<p class='util--hide'>View <a href='https://learn.co/lessons/javascript-git-hub-api-with-xhr-lab'>GitHub API With XHR Lab</a> on Learn.co and start learning to code for free.</p>

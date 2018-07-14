JavaScript GitHub API with XHR
---

## Objectives

1. Practice making HTTP requests with XHR
2. Practice doing things with XHR responses

## Introduction

The [GitHub API](https://developer.github.com/v3/) provides access to a
lot of interesting and useful data that we can use with `XMLHttpRequest`
to create our own applications that extend Github's functionality.

The documentation is extensive and well-organized. For instance,
anything you can do regarding a Github repository will be under the
[Repositories](https://devoper.github.com/v3/repos/) section.

Each section is broken down by function, and tells you exactly what you
need to know to request that API endpoint, including any URI parameters
(denoted by colons in the parameter, like `/repos/:username`) you'll
need to provide and an example of the response JSON.

Read through the [overview](https://developer.github.com/v3/) section to
learn how to interact with the Github API. We won't be using any
functions that require authentication, so don't worry about that too
much yet. After that, read through the [repositories](https://developer.github.com/v3/repos/) section and get an idea of the types of things you can do with repository data.

Once you're done exploring, you'll put that knowledge to the test to
create a simple repository browser. Follow the directions below to
create a page that allows you to dynamically browse repositories,
commits, and branches using XHR.

A basic HTML structure has been provided for you. Make sure to run
tests and try it out in your browser to see it in action!

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

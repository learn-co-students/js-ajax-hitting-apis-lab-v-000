function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/octocat/repos')
  req.send()
}


function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repository="' + r.name + '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-username="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li>' + commit.author.login + ' <strong>' + commit.commit.author.name + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const name = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/branches')
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const commitsList = `<ul>${branches.map(branch => '<li>' + ' <strong>' + branch.name + '</strong> - ' + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

// Add a link to each repository that calls a getBranches function when clicked and, when complete,
// calls a displayBranches function that fills the details div with a list of names of each branch of the repository.
// Give the link data attributes of username and repository for use by the getBranches function.
//
// Add a link to each repository that calls a getCommits function on click and, when the request is complete,
// calls a displayCommits function that fills the details div with a list of commits for that repository.
// The display of commits should include the author's Github name, the author's full name, and the commit message.
// Give the link data attributes of username and repository to be used by the getCommits function.

// function showCommits() {
//   const commits = JSON.parse(this.responseText)
//   const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
//   document.getElementById("commits").innerHTML = commitsList
// }

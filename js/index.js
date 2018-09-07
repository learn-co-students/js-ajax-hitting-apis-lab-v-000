function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)

  const repoList = `<ul>${repos.map(r =>
    '<li>'
    + r.name
    + ' : <a href="' + r.html_url + '" target="_blank">Link To Repo</a>'
    + ' - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" + onclick="getCommits(this)">Get Commits</a>'
    + ' - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" + onclick="getBranches(this)">Get Branches</a></li>'
  ).join('')}</ul>`

  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  var username = document.getElementById("username").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function showURL(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", showCommits)
  req.open("GET", 'https://api.github.com/repos/octocat/' + name )
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li>' + commit.commit.author.name + ' - <strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getCommits(el) {
  const repo = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repo + '/commits')
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

function getBranches(el) {
  const repo = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repo + '/branches')
  req.send()
}
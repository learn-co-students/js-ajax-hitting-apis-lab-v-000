function getRepositories() {
  let username = document.getElementById('username').value
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function showRepositories(event,data) {
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + r.html_url + ' - <a href="#" data-repo="'
  + r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this)">Get Commits</a>' + ' - <a href="#" data-repo="'
  + r.name + '" data-username="' + r.owner.login + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById('repositories').innerHTML = repoList
}



function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(c => '<li>' + c.author.login + ' ' + c.commit.author.name + ' ' + c.commit.message + '</li>').join('')}</ul>`
  document.getElementById('details').innerHTML = commitsList
}

function getCommits(el) {
  let repo = el.dataset.repo
  let username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repo + '/commits')
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(b => '<li>' + b.name + '</li>').join('')}</ul>`
  document.getElementById('details').innerHTML = branchesList
}

function getBranches(el) {
  let repo = el.dataset.repo
  let username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repo + '/branches')
  // /repos/:owner/:repo/branches
  req.send()
}

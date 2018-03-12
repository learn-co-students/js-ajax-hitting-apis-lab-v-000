function getRepositories() {
  let username = document.getElementById('username').value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/' + username + '/repos')
  req.send()
}

function displayRepositories(event,data) {
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' ' + r.html_url + ' - <a href="#" data-repo="'
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
  const repo = el.dataset.repo
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + username + '/Spoon-Knife/commits') // here it should go " '/' + repo + ..."
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(b => '<li>' + b.name + '</li>').join('')}</ul>`
  document.getElementById('details').innerHTML = branchesList
}

function getBranches(el) {
  const repo = el.dataset.repo
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/' + username + '/Spoon-Knife/branches') // here it should go " '/' + repo + ..."
  // /repos/:owner/:repo/branches
  req.send()
}

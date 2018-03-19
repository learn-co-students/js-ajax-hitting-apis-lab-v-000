function getRepositories() {
  const req = new XMLHttpRequest()
  let username = document.getElementById('username').value
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/' + username + '/repos')
  req.send()
}

function displayRepositories() {
  let repo = JSON.parse(this.responseText)
  console.log(repo)
  let repoList = `<ul>${repo.map(repo => '<li><a data-repository="' + repo.name + '" href="#" onclick="getCommits(this)">' + repo.name + '</a> - <a href="' + repo.url + '">' + repo.html_url + '</a> - <a href="#" onclick="getBranches(this)" data-repository="' + repo.name + '">Branches</a></li>' ).join('')}</ul>`
  document.getElementById('repositories').innerHTML = repoList
}

function getCommits(el) {
  const req = new XMLHttpRequest()
  let repo = el.dataset.repository
  let username = document.getElementById('username').value
  req.addEventListener("load", displayCommits);
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repo + '/commits')
  req.send()
}

function displayCommits() {
  let commits = JSON.parse(this.responseText)
  console.log(commits)
  let commitsList = `<ul>${commits.map(commit => '<li>' + commit.commit.author.name + ' : ' + commit.committer.login + ' - '+ commit.commit.message + '</li>' ).join('')}</ul>`
  document.getElementById('details').innerHTML = commitsList
}

function getBranches(el) {
  const req = new XMLHttpRequest()
  let repo = el.dataset.repository
  let username = document.getElementById('username').value
  req.addEventListener("load", displayBranches);
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repo + '/branches')
  req.send()
}

function displayBranches() {
  let branches = JSON.parse(this.responseText)
  console.log(branches)
  let branchesList = `<ul>${branches.map(branche => '<li>' + branche.name + '</li>' ).join('')}</ul>`
  document.getElementById('details').innerHTML = branchesList
}

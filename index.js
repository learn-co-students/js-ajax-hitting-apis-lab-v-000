function getRepositories() {
  const req = new XMLHttpRequest()
  const username = document.getElementById('username').value
  req.addEventListener('load', displayRepositories)
  req.open('GET', `https://api.github.com/users/${username}/repos`)
  req.send()
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - ' + r.owner.login + ' - ' + r.html_url + ' - <a href="#" data-username="' + r.owner.login + '" data-repository="' + r.name + '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-username="' + r.owner.login + '" data-repository="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById('repositories').innerHTML = repoList
}

function getCommits(el) {
  const name = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.open("GET", `https://api.github.com/repos/${username}/${name}/commits`)
  req.addEventListener("load", displayCommits)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - <strong>' + commit.commit.author.name + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const name = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.open("GET", `https://api.github.com/repos/${username}/${name}/branches`)
  req.addEventListener("load", displayBranches)
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join("")}`
  document.getElementById("details").innerHTML = branchesList

}
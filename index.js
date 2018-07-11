function displayRepositories() {
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="' + r.html_url + '">Link</a> - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '"onclick="getCommits(this)">Commits</a> - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '"onclick="getBranches(this)">Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.author.name + ' - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + ' - <a href="' + branch.protection_url + '">Link</a></li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

function getRepositories() {
  let username = document.getElementById("username").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", `https://api.github.com/users/${username}/repos` )
  req.send()
}

function getCommits(el) {
  const repository = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${username}/${repository}/commits`)
  req.send()
}

function getBranches(el) {
  const repository = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", `https://api.github.com/repos/${username}/${repository}/branches`)
  req.send()
}

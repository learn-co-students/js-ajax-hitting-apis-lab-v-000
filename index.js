function getRepositories() {
  const name = document.getElementById("username").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/' + name +'/repos')
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href=' + r.html_url + '>Go To Repo</a>- <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a>- <a href="#" data-repo="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>').join("")}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const owner = document.getElementById("username").value
  const repo = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + owner + '/' + repo + '/commits')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(c => '<li><strong>' + c.author.login + ' -' + c.commit.committer.name + '</strong> - ' + c.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const owner = document.getElementById("username").value
  const repo = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + owner + '/' + repo + '/branches')
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(b => '<li><strong>' + b.name + ' -' + b.protection_url.split("/")[4] +  '- </strong> -' + b.protection_url.split("/")[5] + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

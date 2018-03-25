const rootURL= "https://api.github.com"

function getRepositories() {
  const username = document.getElementById("username").value
  const url = rootURL + "/users/" + username + "/repos"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", url)
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' ' + r.owner.login + ' ' + r.html_url + ' - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-repository="' + r.name +'" data-username="' + r.owner.login + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const name = el.dataset.repository
  const user = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", rootURL + '/repos/' + user + '/' + name + '/commits')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  console.log(commits)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + ' ' + commit.author.login + '</strong> -' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const name = el.dataset.repository
  const user = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", rootURL + '/repos/' + user + '/' + name + '/branches')
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

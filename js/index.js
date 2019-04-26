// your code here

function getRepositories() {
  const req = new XMLHttpRequest()
  const username = document.getElementById("username").value
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/' + username + '/repos')
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - ' + r.html_url + ' - <a href="#" data-repo="' + r.name + '" onclick="getBranches(this)">Get Branches</a>' + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const repository = el.dataset.repository
  const username = document.getElementById("username").value
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayCommits)
  xhr.open("GET", 'https://api.github.com/repos/' + username + '/' + repository + '/commits')
  xhr.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + ' / ' + commit.commit.author.name + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const repository = el.dataset.repository
  const username = document.getElementById("username").value
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayBranches)
  xhr.open("GET", 'https://api.github.com/repos/' + username + '/' + repository + '/branches')
  xhr.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong></li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
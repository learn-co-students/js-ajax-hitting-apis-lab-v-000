function getRepositories() {
  const req = new XMLHttpRequest()
  const name = document.getElementById('username').value
  req.addEventListener("load", displayRepositories);
  const url = 'https://api.github.com/users/' + name + '/repos'
  req.open("GET", url)
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="' + r.html_url + '">Link</a> '+ ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a> '+ ' - <a href="#" data-repo="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>' ).join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const repository = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  const username = document.getElementById('username').value
  const url = 'https://api.github.com/repos/' + username + '/'+ repository + '/commits'
  req.open("GET", url)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li>' + commit.commit.author.name + ' ' + commit.author.login + ' - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("commits").innerHTML = commitsList
}

function getBranches(el) {
  const repository = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  const username = document.getElementById('username').value
  const url = 'https://api.github.com/repos/' + username + '/'+ repository + '/branches'
  req.open("GET", url)
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("branches").innerHTML = branchesList
}

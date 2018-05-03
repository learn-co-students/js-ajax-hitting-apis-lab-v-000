function getRepositories() {
  const username = document.getElementById("username").value

  const req = new XMLHttpRequest()

  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function displayRepositories(event, data) {
  const repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="' + r.html_url + '">URL</a>' + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-repo="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(element) {
  const username = document.getElementById("username").value
  const name = element.dataset.repository
  const req = new XMLHttpRequest()

  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${username}/` + name + '/commits')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)

  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> -' + '<strong>' + commit.commit.author.name + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}


function getBranches(element) {

  const username = document.getElementById("username").value
  const repoName = element.dataset.repository
  const req = new XMLHttpRequest()
  // debugger
  req.addEventListener("load", displayBranches)
  req.open("GET", `https://api.github.com/repos/${username}/${repoName}/branches`)
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)

  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong>' + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

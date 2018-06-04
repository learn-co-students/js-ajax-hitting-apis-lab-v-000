const git = "https://api.github.com/users/"

function getRepositories() {
  const user = document.getElementById("username").value
  const url = git + user + "/repos"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", url)
  req.send()
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.html_url + ' - <a href="#" data-repo="' + r.name +'" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitList = `<ul>${commits.map(c => '<li>' + c.commit.author.name + ' ' + c.author.login + ' ' + c.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML += commitList
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchList = `<ul>${branches.map(b => '<li>' + b.name + '</li>')}</ul>`
  document.getElementById("details").innerHTML += branchList
}
//repos/:owner/:repo/commits
function getCommits(that) {
  const url = 'https://api.github.com/' + 'repos/' + that.dataset.username + '/' + that.dataset.repository + '/commits'
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", url)
  req.send()
}

function getBranches(that) {
  const url = 'https://api.github.com/' + 'repos/' + that.dataset.username + '/' + that.dataset.repository + '/branches'
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", url)
  req.send()
}

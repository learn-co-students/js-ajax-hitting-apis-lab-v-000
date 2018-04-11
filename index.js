function displayBranches(){
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong> ' + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

function getBranches(el) {
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/branches')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.author.name + '-' +  commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getCommits(el) {
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits')
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.html_url + '</li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", "https://api.github.com/users/octocat/repos")
  req.send()
}

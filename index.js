function getRepositories() {
  const name = document.getElementById("username").value
  const url = "https://api.github.com" + "/users/" + name + "/repos"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", url)
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
    console.log(repos)
    const repoList =`<ul>${repos.map(r => '<li>' + `<h3><a href=${r.html_url}>${r.name}</a></h3><br>` + `<a href="#" data-username=${r.owner.login} data-repository=${r.name} onclick="getCommits(this)">Get Commits</a><br>` +
    `<a href="#" data-username=${r.owner.login} data-repository=${r.name} onclick="getBranches(this)">Get Branches</a>` + '</li>' ).join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const name = el.dataset.repository
  const commitsURL = "https://api.github.com" + "/repos/" + el.dataset.username + "/" + name + "/commits"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", commitsURL)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' +
  commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const name = el.dataset.repository
  const branchesURL =  "https://api.github.com" + "/repos/" + el.dataset.username + "/" + name + "/branches"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", branchesURL)
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

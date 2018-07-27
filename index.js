function getRepositories() {
  const req = new XMLHttpRequest()
  const username = document.getElementById("username").value;

  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)


  const repoList = `<ul>${repos.map(  r =>
     '<li>' + r.name + '<br> - <a href="' + r.html_url +'">Repo Page</a>'
     + ' - <a href="#" data-repository="' + r.name +'" data-username="' + r.owner.login + '"' +'" onclick="getCommits(this)">Get Commits</a>'
     + ' - <a href="#" data-repository="' + r.name +'" data-username="' + r.owner.login + '"' +'" onclick="getBranches(this)">Get Branches</a></li>'
   ).join('')}</ul>`


  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {

  const username = el.dataset.username
  const name = el.dataset.repository

  const req = new XMLHttpRequest()
  const uri = "https://api.github.com/repos/" + username + '/' + name + '/commits'

  req.addEventListener("load", displayCommits)
  req.open("GET", uri)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)

  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const username = el.dataset.username
  const name = el.dataset.repository
  const uri = "https://api.github.com/repos/" + username + '/' + name + '/branches'

  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayBranches)
  xhr.open("GET", uri)
  xhr.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)

  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`

  document.getElementById("details").innerHTML = branchesList
}

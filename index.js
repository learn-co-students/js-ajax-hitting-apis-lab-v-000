const baseURL = "https://api.github.com"

function getRepositories() {
  let user = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  
  req.addEventListener("load", displayRepositories)
  
  req.open("GET", baseURL + '/users/' + user + '/repos')
  
  req.send()
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText)
  // console.log(repos);
  
  
  const repoList = `<ul>${repos.map(r =>'<li>' + r.name + ' - https://github.com/' + r.full_name + ' <a href="#" data-repo="' + r.name + '" data-username="' + r["owner"]["login"]   + '" onclick="getCommits(this)">Get Commits</a>' + ' <a href="#" data-repo="' + r.name + '" data-username="' + r["owner"]["login"] + '" onclick="getBranches(this)">Get Branches</a>' + '</li>').join('')}</ul>`
  
  document.getElementById('repositories').innerHTML = repoList
}

function getCommits(el) {
  const repoName = el.dataset.repository
  const url = baseURL + '/repos/' + el.dataset.username + '/' + repoName + '/commits'
  const req = new XMLHttpRequest()
  
  req.addEventListener("load", displayCommits)
  req.open("GET", url)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(c => '<li>' + c.commit.author.name + ' (' + c.author.login + ')' + c.commit.message + '</li>')}</ul>`
  
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const repoName = el.dataset.repository
  const url = baseURL + '/repos/' + el.dataset.username + '/' + repoName + '/branches'
  const req = new XMLHttpRequest();
  
  req.addEventListener("load", displayBranches)
  req.open("GET", url)
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(b => '<li' + b.name + '</li>').join("")}</ul>`
  document.getElementById('details').innerHTML = branchesList
}
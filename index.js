

function displayRepositories() {
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.html_url + '<a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a> or <a href="#" data-repo="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>"').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}



function displayCommits() {
  var commits = JSON.parse(this.responseText)
  const commitList = `<ul>${commits.map(c => '<li>' + c.commit.author.name + " " + c.author.login + " " + c.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitList
}



function displayBranches() {
  var branches = JSON.parse(this.responseText)
  const branchList = `<ul>${branches.map(b => '<li>' + b.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchList
}



function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/' + `${document.getElementById('username').value}` + '/repos')
  req.send()
}



function getCommits(el) {
  const data = el.dataset
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + data.username + '/' + data.repository + '/commits')
  req.send()
}



function getBranches(el) {
 const data = el.dataset
 const req = new XMLHttpRequest()
 req.addEventListener("load", displayBranches)
 req.open("GET", 'https://api.github.com/repos/' + data.username + '/' + data.repository + '/branches')
 req.send()
}

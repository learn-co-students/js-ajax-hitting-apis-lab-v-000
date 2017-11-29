// function getRepositories(){
//
//   const req = new XMLHttpRequest()
//   req.addEventListener("load", displayRepositories);
//   req.open("GET", `https://api.github.com/users/${username}/repos`)
//   req.send()
// }

function getRepositories() {
  var username = document.getElementById("username").value;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  const repoList = "<ul>" + repos.map(r => `<li><a href=${r.html_url}>${r.name}</a> by ${r.owner.login} | <a href="#" data-repository="${r.name}" data-username="${r.owner.login}" onclick="getCommits(this)">Get Commits</a> </li> | <a href="#" data-repository="${r.name}" data-username="${r.owner.login}" onclick="getBranches(this)">Get Branches</a>
`).join('') + "</ul>"

  document.getElementById("repositories").innerHTML = repoList
}

function getBranches(name){
  const repoName = name.dataset.repository
  const ownerName = name.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/' + ownerName + '/' + repoName + '/branches')
  req.send()
}

function getCommits(name){
  const repoName = name.dataset.repository
  const ownerName = name.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + ownerName + '/' + repoName + '/commits')
  req.send()
}

function displayCommits(){
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '(' + commit.commit.author.name + ')' + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function displayBranches(){
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong></li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

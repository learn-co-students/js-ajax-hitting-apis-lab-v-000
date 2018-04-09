function getRepositories() {
  const req = new XMLHttpRequest()
  let login = document.getElementById("username").value
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/' + login + '/repos')
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.html_url + ' - <a href="#" data-username="' + r.owner.login + '" data-repository="' + r.name + '" onclick="getCommits(this)">Get Commits</a>' + ' | ' + '<a href="#" data-username="' + r.owner.login + '" data-repository="' + r.name + '"onclick="getBranches(this)">Get Branches</a>'+ '</li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const name = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + name + '/commits')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.committer.name + '</strong> - ' + commit.author.login + ' - '+ commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el){
  const name = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + name + '/branches')
  req.send()
}

function displayBranches(){
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong> - ' + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

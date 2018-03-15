function displayRepositories() {
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' '+ r.owner.login+ ' ' + r.html_url +' - <a href="#" data-repository="' + r.name + '" data-username="'+ username.value +'" onclick="getCommits(this)">Get Commits</a><a href="#" data-repository="' + r.name + '" data-username="'+ username.value +'" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  const req = new XMLHttpRequest()
  var username = document.getElementById("username").value
  var url = 'https://api.github.com/users/' + username + '/repos'
  req.addEventListener("load", displayRepositories);
  req.open("GET", url)
  req.send()
}
function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li>'+ commit.commit.author.name +' <strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}
function getCommits(el) {
  const name = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/'+ username +'/' + name + '/commits')
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>'+ branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
function getBranches(el) {
  const name = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/'+ username +'/' + name + '/branches')
  req.send()
}

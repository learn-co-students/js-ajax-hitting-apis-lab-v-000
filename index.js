function getRepositories() {
  var username = document.getElementById("username").value;
  const url = "https://api.github.com/users/" + username + "/repos"

  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", url)
  req.send()
  return false;
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li><a href="' + r.html_url + '">' + r.name + '</a> <br><a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '"onclick="getCommits(this)">Get Commits</a><br> <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '"onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`

  document.getElementById("repositories").innerHTML = repoList
}

function displayCommits(){
  const commits = JSON.parse(this.responseText)

  const commitsList = `<ul>${commits.map(c => '<li>' + c.commit.author.name + ' ' + c.author.login + ' ' + c.commit.message)}`
  document.getElementById("details").innerHTML = commitsList
}

function displayBranches(){
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(b => '<li>' + b.name)}`
  document.getElementById("details").innerHTML = branchesList
}


function getCommits(el){
  const name = el.dataset.repository
  const user = el.dataset.username
  const req = new XMLHttpRequest()

  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + user + '/' + name + '/commits')
  req.send()
}

function getBranches(el){
const name = el.dataset.repository
const user = el.dataset.username
const req = new XMLHttpRequest()

req.addEventListener("load", displayBranches)
req.open("GET", 'https://api.github.com/repos/' + user + '/' + name + '/branches')
req.send()
}

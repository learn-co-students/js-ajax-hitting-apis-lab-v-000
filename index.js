const rootURL = "https://api.github.com"
const baseURL = 'https://github.com/'

function getRepositories() {

  const user = document.getElementById("username").value
  const repo = rootURL + '/users/' + user + '/repos'
  const req = new XMLHttpRequest()

  req.addEventListener("load", displayRepositories)
  req.open("GET", repo)
  req.send()
  return false
}

function displayRepositories(){

  const repos = JSON.parse(this.responseText)

  const repoList = `${repos.map(r => { return (baseURL + r.full_name + ` - <a href="#" data-repo="${r.name}" onclick="getCommits(this)">Get Commits</a>  - <a href="#" data-repo="${baseURL + r.full_name}/branches" onclick="getBranches(this)">  Get Branches</a>`)}).join('')}`;

  document.getElementById("repositories").innerHTML = repoList
}


function getCommits(el) {

  const name = el.dataset.repo
  const req = new XMLHttpRequest()

  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits')
  req.send()
}

function displayCommits() {

  var commits = JSON.parse(this.responseText)

  let commitList = `<ul>${commits.map(r => '<li>'  + r.commit.author.name + ' - ' + r.author.login + ' - ' + r.commit.message).join('')}</ul>`
  document.getElementById("details").innerHTML = commitList
}

function displayBranches() {
  var branches = JSON.parse(this.responseText)
  const branchList = `${branches.map(r => {
    return (r.name)
    }).join('')
  }`;

  document.getElementById("details").innerHTML = branchList
}

function getBranches(el) {
  const name = el.dataset.repo

  const req = new XMLHttpRequest()

  req.addEventListener("load", displayBranches)
  req.open("GET", name)
  req.send()
}

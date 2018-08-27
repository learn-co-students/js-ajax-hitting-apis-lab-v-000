function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name
  + ' - <a href="#" data-repo="' + r.html_url
  + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  const name = document.getElementById("username").value
  const url = "https://api.github.com/users/" + name + "/repos"

  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", url)
  req.send()
  return false;
}

function getCommits(el) {
  const rname = el.dataset.repository
  console.log(rname)
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + el.dataset.username  + '/' + rname + '/commits')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + ' ' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const bname = el.dataset.repository
    console.log(bname)
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/' + el.dataset.username  + "/" + bname + '/branches')
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

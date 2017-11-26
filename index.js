// https://api.github.com/users/rjcolmed/repos
//include name and link to the public URL
function getRepositories() {
  let username = document.getElementById('username').value;
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories)
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function showRepositories(event, data) {
  const repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(repo => '<li><a href="' + repo.html_url + '">'+ repo.name +'</a> - <a href="#" data-repo="' + repo.name + '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-repo="' + repo.name + '" data-owner="' + repo.owner.login + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", showCommits)
  req.open("GET", `https://api.github.com/repos/octocat/${name}/commits`)
  req.send()
}

function showCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '-'  + commit.commit.author.name  + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

// GET /repos/:owner/:repo/branches

function getBranches(el) {
  const ownerName = el.datset.owner
  const repoName = el.dataset.repo
  const req = new XMLHttpRequest()
  req.open("GET", `https://api.github.com/repos/${ownerName}/${repoName}/branches`)
  req.send()
}
function displayRepositories(event, data) {
  let repos = JSON.parse(this.responseText)
  const username = document.getElementById('username').value
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li username="' + username + '" repository="' + r.name+'">' + r.name + ' <a href="' + r.html_url + '">Repo</a>' + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a>'  + ' - <a href="#" data-repo="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  const req = new XMLHttpRequest()
  const username = document.getElementById('username').value
  const repo = 'https://api.github.com/users/' + username + '/repos'
  req.addEventListener("load", displayRepositories);
  req.open("GET", repo)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + ' - ' + commit.commit.author.name +'</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

//el = { dataset: { repository: 'Spoon-Knife', username: 'octocat' } }
function getCommits(el) {
  const repository = el.dataset.repository
  const username = el.dataset.username
  // const repository = el.dataset.repo
  // const username = document.getElementById('username').value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repository + '/commits')
  req.send()
}


function getBranches(el) {
  const repository = el.dataset.repository
  const username = el.dataset.username
  // const repository = el.dataset.repo
  // const username = document.getElementById('username').value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repository + '/branches')
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

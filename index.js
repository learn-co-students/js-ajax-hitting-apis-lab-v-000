function getRepositories() {
  const username = document.getElementById('username').value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", 'https://api.github.com/users/' + username + '/repos')
  req.send()
}

function displayRepositories(event, data) {
  const repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li><h3>' + r.name + '</h3><a href="' + r.html_url + '">' + r.html_url + '</a><br>' + ' - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this)">Get Commits</a><br> - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`

  document.getElementById('repositories').innerHTML = repoList
}

function getCommits(el) {
  const repoName = el.dataset.repository
  const url = 'https://api.github.com/repos/' + el.dataset.username + '/' + repoName + '/commits'
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", url)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(c => '<li><h4>' + c.commit.author.name + ' (' + c.author.login + ')</h4>' + c.commit.message + '</li>').join('')}</ul>`

  document.getElementById('details').innerHTML = commitsList
}

function getBranches(el) {
  const repoName = el.dataset.repository
  const url = 'https://api.github.com/repos/' + el.dataset.username + '/' + repoName + '/branches'
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", url)
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<h4>Branches</h4><ul>${branches.map(b => '<li>' + b.name + '</li>').join('')}</ul>`

  document.getElementById('details').innerHTML = branchesList
}

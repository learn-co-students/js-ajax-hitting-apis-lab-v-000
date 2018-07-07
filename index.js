function getRepositories() {
  const username = document.getElementById('username').value;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/' + username + '/repos')
  req.send()
}

function displayRepositories(event, data) {
  const repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(repo => '<li>' + repo.name + ' - ' + '<a href="#" data-repo="' + repo.html_url +'>' + repo.html_url + '</a></li> - <li><a href="#" data-repo="' + repo.name + '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-branch="' + repo.branches_url + '" onclick="getBranches(this)">Get Branches</a> </li>').join('')}</ul>`;
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const repo = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repo + '/commits')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.committer.name + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const repo = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repo + '/branches')
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong> - ' + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

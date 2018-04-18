let Input = {};

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li><strong>' + r.name + '</strong> | ' + r.owner.login + ' | ' + r.clone_url + ' - <a href="#" data-repository="' + r.name + '" onclick="getCommits(this)">Get Commits</a> | <a href="#" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

 // | <a href="#" onclick="getBranches(this)">Get Branches</a>

// '<li><strong>' + r.name + '</strong> | ' + r.owner.login + ' | ' + r.clone_url + ' - <a href="#" data-repository="' + r.name + '" onclick="getCommits(this)">Get Commits</a> | <a href="#" onclick="getBranches(this)">Get Branches</a></li>'

function getRepositories() {
  const req = new XMLHttpRequest()
  Input.username = document.getElementById("username").value;
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${Input.username}/repos`)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.author.name + ' - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getCommits(el) {
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${Input.username}/${name}/commits`)
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  console.log(branches)
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong> - ' + branch.commit.url + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

function getBranches(el) {
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/' + Input.username +'/' + name + '/branches')
  req.send()
}

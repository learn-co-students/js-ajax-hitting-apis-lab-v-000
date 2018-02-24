function getRepositories() {
  const req = new XMLHttpRequest()
  var userName = document.getElementById("username").value;
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${userName}/repos`)
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name +
  ' - <a href="https://github.com/octocat/'+r.name+
  '" target="_blank">Get Repo</a> - <a href="#" data-repository="' + r.name +
  '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-repository="' + r.name +
  '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  var userName = document.getElementById("username").value
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${userName}/` +name+ '/commits')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' +
    commit.author.login + ' - ' + commit.commit.author.name + '</strong> - ' +
    commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const name = el.dataset.repository
  console.log("*** Name: " + name)
  const req = new XMLHttpRequest()
  var userName = document.getElementById("username").value
  req.addEventListener("load", displayBranches)
  req.open("GET", `https://api.github.com/repos/${userName}/` +
    name + '/branches')
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' +
    branch.name + '</strong>' + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

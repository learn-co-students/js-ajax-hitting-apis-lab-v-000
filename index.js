
function getRepositories() {
  const name = document.getElementById("username").value
  const uri = 'https://api.github.com' + "/users/" + name + "/repos"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", uri)
  req.send()
  return false;
}


function displayRepositories() {
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => (`<li>
          <h3>${r.name}</h3>
          <a href="${r.html_url}">${r.html_url}</a><br>
          <a href="#" data-repo="` + r.name + `" onclick="getCommits(this)">Get Commits</a><br>
          <a href="#" data-repo="` + r.name + `" onclick="getBranches(this)">Get Branches</a></li>
        </li>`)
  ).join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}


function getCommits(el) {
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}
function getBranches(el) {
  const name = el.dataset.repository
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayBranches)
  xhr.open("GET", 'https://api.github.com/repos/octocat/' + name + "/branches")
  xhr.send()
}
function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

//Repos//

function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  let name = document.getElementById("username").value
  console.log(name)
  req.open("GET", `https://api.github.com/users/${name}/repos`)
  req.send()
}


function displayRepositories(event, data){
  var repos = JSON.parse(this.responseText)
  console.log(repos)

  const repoList = `<ul>${repos.map(r => `<li>${r.name} - <a href="#" data-repo="${r.name}" onclick="getCommits(this)">Get Commits</a></li><li>${r.html_url}</li><li><a href="#" onclick="getBranches(this)">Get Branches</a>`)}</ul>`

  document.getElementById("repositories").innerHTML = repoList
}

//Commits//

function getCommits(el) {
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/octocat/${name}/commits`)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => `<li><strong>${commit.author.login}</strong> - ${commit.commit.message}</li><li> ${commit.commit.author.name}</li>`)}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

//Branches//

function getBranches(el) {
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", `https://api.github.com/repos/octocat/${name}/branches`)
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => `<li>${branch.name}</li>`)}</ul>`
   document.getElementById("details").innerHTML = branchesList
}

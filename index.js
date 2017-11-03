const gitURL = "https://api.github.com"

function getRepositories() {
  const name = document.getElementById("username").value
  // GitHub API: https://api.github.com/users/:username/repos
  const url = gitURL + "/users/" + name + "/repos"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", url)
  req.send()
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => 
                    '<li>' + 
                      `<h3><a href=${r.html_url}>${r.name}</a></h3><br>` + 
                      `<a href="#" data-username=${r.owner.login} data-repository=${r.name} onclick="getCommits(this)">Get Commits</a><br>` +
                      `<a href="#" data-username=${r.owner.login} data-repository=${r.name} onclick="getBranches(this)">Get Branches</a>` +
                    '</li>'
                    ).join('')
                    }</ul>`
  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el) {
  const repoName = el.dataset.repository
  const commitsURL = gitURL + "/repos/" + el.dataset.username + "/" + repoName + "/commits"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", commitsURL)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  // console.log(commits)
  const commitsList = `<ul>${commits.map(commit => 
                        '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + 
                        commit.commit.message + 
                        '</li>').join('')
                      }</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const repoName = el.dataset.repository
  const branchesURL = gitURL + "/repos/" + el.dataset.username + "/" + repoName + "/branches"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", branchesURL)
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  // console.table(branches)
  const branchList = `<ul>${branches.map(branch => 
                       '<li>' + branch.name + '</li>').join('')
                     }</ul>`
  document.getElementById("details").innerHTML = branchList
}
function getRepositories(username) {
  var username = document.getElementById('username').value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/' + username + '/repos')
  req.send()
}


function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="' + r.html_url + '" data-repo="' + r.name + '">Go to Repo</a> <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">GetCommits</a><a href="#" data-repo="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`

  document.getElementById("repositories").innerHTML = repoList
}

function displayCommits() {

}



function getCommits(el) {
  var username = document.getElementById('username').value
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + name + '/commits')

  req.send()
}


function getBranches(el) {
  var username = document.getElementById('username').value
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + name + '/branches')
  req.send()
}
function displayBranches(username, repository) {
  const branches = JSON.parse(this.responseText)
  console.log(branches)
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name  + '</strong></li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

// function getBranches(el) {
//   const repoName = el.dataset.repository
//   const uri = rootURL + "/repos/" + el.dataset.username + "/" + repoName + "/branches"
//   const xhr = new XMLHttpRequest()
//   xhr.addEventListener("load", displayBranches)
//   xhr.open("GET", uri)
//   xhr.send()
// }
// function displayBranches() {
//   const branches = JSON.parse(this.responseText)
//   const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
//   document.getElementById("details").innerHTML = branchesList
// }




function displayCommits() {
  const commits = JSON.parse(this.responseText)
  console.log(commits)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login +'-'+ commit.commit.author.name + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

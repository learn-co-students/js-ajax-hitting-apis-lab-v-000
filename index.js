const rootURL = "https://api.github.com"

function getRepositories() {
  var username = document.getElementById('username').value;
  const req = new XMLHttpRequest()
  // console.log(displayRepositories)
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos` )
  req.send()
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText)
  // const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  const repoList = "<ul>" + repos.map(repo => {
     const dataUsername = 'data-username="' + repo.owner.login + '"'
     const dataRepoName = 'data-repository="' + repo.name + '"'
     return(`
           <li>
             <h2>${repo.name}</h2>
             <a href="${repo.html_url}">${repo.html_url}</a><br>
             <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
             <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
           </li>`
           )
   }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {

  const name = el.dataset.repository
  debugger
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${el.dataset.username}/${name}/commits`)
  req.send()
  debugger
}

function displayCommits() {
  debugger
  var commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const repoName = el.dataset.repository
  const uri = rootURL + "/repos/" + el.dataset.username + "/" + repoName + "/branches"
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayBranches)
  xhr.open("GET", uri)
  xhr.send()
}
function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}


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
  const repoList = "<ul>" + repos.map(r => {
    const dataUsername = 'data-username="' + r.owner.login + '"'
    const dataRepoName = 'data-repository="' + r.name + '"'
    return(`
          <li>
            <h2>${r.name}</h2>
            <a href="${r.html_url}">${r.html_url}</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
          </li>`
          )
  }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList
}


function getCommits(el) {
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  const uri = 'https://api.github.com' + "/repos/" + el.dataset.username + "/" + name + "/commits"
  req.addEventListener("load", displayCommits)
  req.open("GET", uri)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitList
}
function getBranches(el) {
  const name = el.dataset.repository
  const xhr = new XMLHttpRequest()
  const uri = 'https://api.github.com' + "/repos/" + el.dataset.username + "/" + name + "/branches"
  xhr.addEventListener("load", displayBranches)
  xhr.open("GET", uri)
  xhr.send()
}
function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchList
}

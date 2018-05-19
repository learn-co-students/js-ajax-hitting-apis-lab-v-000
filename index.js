function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => {
  const dataUsername = `data-username="${r.owner.login}"`
  const dataRepoName = `data-repository="${r.name}"`
  return(
    `<li>
      <p>${r.name}</p>
      <a href="${r.html_url}">${r.html_url}</a><br>
      <a href="#"  ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Commits</a><br>
      <a href="#"  ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Branches</a><br>
    </li>`
    )
  }).join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong></li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

function getRepositories() {
  let username = document.getElementById('username').value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function getCommits(el) {
  const repoName = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${username}/${repoName}/commits`)
  req.send()
}

function getBranches(el) {
  const repoName = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", `https://api.github.com/repos/${username}/${repoName}/branches`)
  req.send()
}

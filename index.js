function getRepositories() {
  let username = document.getElementById("username").value;
  const req = new XMLHttpRequest()
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText)
  const repoList = repos.map(r => {
    return `<li><a href=${r.html_url}>${r.name}</a><br>
    <a href='#'
    data-respository="${r.name}"<br>
    data-username="${r.owner.login}"<br>
    onclick='getCommits(this)'> Show Commits </a><br>
    <a href='#'
    data-respository="${r.name}"<br>
    data-username="${r.owner.login}"<br>
    onclick='getBranches(this)'> Show Branches </a></li>`
  }).join('')
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const repo = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${username}/${repo}/commits`)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li>' + commit.commit.author.name + ' (' + commit.author.login + ')' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const repo = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", `https://api.github.com/repos/${username}/${repo}/branches`)
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

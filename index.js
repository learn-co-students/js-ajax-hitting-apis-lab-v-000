function userName() {
  return document.getElementById("username").value;
}

function getRepositories() {
  let username = userName();

  let req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function getCommits(el) {
  let repoName = el.dataset.repository
  let username = userName();
  let req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${username}/${repoName}/commits`)
  req.send()
}

function getBranches(el) {
  let repoName = el.dataset.repository
  let username = userName();
  let req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", `https://api.github.com/repos/${username}/${repoName}/branches`)
  req.send()
}

function displayCommits() {
  let commits = JSON.parse(this.responseText)
  console.log(commits)
  let commitsList = `<ul>${commits.map(commit => '<h3>By: ' + commit.author.login + '</h3><li><strong>' + commit.commit.author.name + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function displayBranches() {
  let branches = JSON.parse(this.responseText)
  console.log(branches)
  let branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

function displayRepositories(event, data) {
  let userRepos = JSON.parse(this.responseText)
  console.log(userRepos)
  for (let i = 0; i < userRepos.length; i++) {
    document.getElementById("repositories").innerHTML += `<h3><a href="${userRepos[i].html_url}">${userRepos[i].name}</a></h3><p>
    <a href="#" data-username=${document.getElementById("username").value} data-repository=${userRepos[i].name} onclick="getCommits(this)">Get Commits</a>
    <a href="#" data-username=${document.getElementById("username").value} data-repository=${userRepos[i].name} onclick="getBranches(this)">Get Branches</a>`
  }
}

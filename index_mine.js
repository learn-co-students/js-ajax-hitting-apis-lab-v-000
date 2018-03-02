function getRepositories() {
  const username = document.getElementById("username").value
  const url = `https://api.github.com/users/${username}/repos`
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", url)
  req.send()
}

function displayRepositories(event, data) {
  const repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' -- <a href="#" data-url="' + r.commits_url + '" onclick="getCommits(this)">Display Commits</a> -- <a href="#" data-url="' + r.commits_url + '" onclick="getBranches(this)">Display Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}


function getCommits(el) {
  const url = el.dataset.url.replace("{/sha}", "")
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", url)
  req.send()
}
  // const req = new XMLHttpRequest()
  // req.addEventListener("load", displayCommits)
  // req.open("GET", 'https://api.github.com/users/octocat/repos')
  // req.send()


function displayCommits(event, data) {
  const commits = JSON.parse(this.responseText)
  const commitList = `<ul>${commits.map(c =>  '<li>' + c["commit"]["message"] + '</li>')}<ul>`
  document.getElementById("details").innerHTML = commitList
}


function displayBranches(el) {
  console.log("Branch!")
}

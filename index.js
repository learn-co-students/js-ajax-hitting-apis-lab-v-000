function getRepositories() {

  const user = document.getElementById("username").value
  debugger
  const req = new XMLHttpRequest()
  req.addEventListener('load', showRepositories)
  req.open("GET", `https://api.github.com/users/${user}/repos`)
  req.send()
}


function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText)

  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}


function getCommits(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits')
  req.send()
}

function displayCommits() {
  var commits = JSON.parse(this.responseText)

  let commitList = `<ul>${commits.map(r => '<li>' + r.name + ' - ' r.commitMessage.join(''))}</ul>`
  document.getElementById("details").innerHTML = commitList
}

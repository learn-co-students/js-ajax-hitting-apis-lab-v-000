function showRepositories(event, data) {
  const repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + '</li>').join('')}</ul>`

  document.getElementById('repositories').innerHTML = repoList
}

function getRepositories() {
  const req = new XMLHttpRequest()
  const name = document.getElementById('username').value
  req.addEventListener("load", showRepositories)
  req.open("GET", `https://api.github.com/users/${name}/repos`)
  req.send()
}
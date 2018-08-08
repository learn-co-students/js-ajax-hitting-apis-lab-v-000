function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  let gitUsername = document.getElementById("username").value
  req.open("GET", `https://api.github.com/users/${gitUsername}/repos`)
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  var reposList = `<ul>${repos.map(r => '<li><a href="' + r.html_url + '">' + r.name + '</a> - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this)">Get Commits</a> | <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getBranches(this)">Get Branches</a> </li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = reposList
}

function getCommits(el) {
  const name = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + name + '/commits')
  req.send()
}

function displayCommits(event, data) {
  let repos = JSON.parse(this.responseText)
  let name = repos[0].commit.author.name
  let login = repos[0].author.login
  document.getElementById("details").innerHTML = `/${name}/<br>  /${login}/<br><br> ${repos.map(r => `/${r.commit.message}/<br>`)} `
}

function getBranches(el) {
  const name = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + name  + '/branches')
  req.send()
}

function displayBranches(event, data) {
  let repos = JSON.parse(this.responseText)
  document.getElementById("details").innerHTML = `<ul> ${repos.map(r => r.name)} </ul>`
}

function getRepositories() {
  const req = new XMLHttpRequest()
  const name = document.getElementById('username').value
  req.addEventListener("load", showRepositories);
  const url = 'https://api.github.com/users/' + name + '/repos'
  req.open("GET", url)
  req.send()
}

function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="' + r.html_url + '">Link</a></li>' ).join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", showCommits)
  const url = 'https://api.github.com/repos/' + name + '/commits'
  req.open("GET", url)
  req.send()
}

function showCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("commits").innerHTML = commitsList
}

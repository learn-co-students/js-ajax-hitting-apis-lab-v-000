function showCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getCommits(el) {
  const name = el.dataset.repo
  const user = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", showCommits)
  req.open("GET", 'https://api.github.com/repos/' + user + '/' + name + '/commits')
  req.send()
}

function showRepositories(event, data) {
  const repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  console.log(repoList)
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  const req = new XMLHttpRequest()
  const user = document.getElementById('username').value;
  console.log(user)
  req.addEventListener("load", showRepositories);
  req.open("GET", 'https://api.github.com/users/' + user + '/repos')
  req.send()
}

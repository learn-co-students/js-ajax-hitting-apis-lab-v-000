function getRepositories() {
  const req = new XMLHttpRequest()
  const username = document.getElementById("username").value;

  req.addEventListener("load", showRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText)

  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + '<br> - <a href="' + r.html_url +'">Repo Page</a></li>'+ ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {

  const username = document.getElementById("username").value;
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", showCommits)
  req.open("GET", `https://api.github.com/repos/${username}/` + name + '/commits')
  req.send()
}

function showCommits() {
  const commits = JSON.parse(this.responseText)

  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

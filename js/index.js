function getRepositories() {
  const req = new XMLHttpRequest()
  let username = document.getElementById('username').value
  req.addEventListener('load', displayRepositories)
  req.open('GET', `https://api.github.com/users/${username}/repos`)
  req.send()
}

function displayRepositories() {
  let repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ` - <a href="${r.html_url}">`+ r.html_url + '</a>' + '<br>').join('')}</ul>`
  document.getElementById('repositories').innerHTML = repoList
}
// /https:\/\/github.com\/octocat\/Hello-World/
// + `<a href="#" data-username="${r.owner.login}" data-repository="${r.name}" onclick="getCommits(this)">Get Commits</a>` + '</li>' + '<br>')

function getCommits(el) {
  let repoName = el.dataset.repository
  let user = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayCommits)
  req.open('GET', `https://api.github.com/repos/${user}/${repoName}/commits`)
  req.send()
}

function displayCommits() {
  let commits = JSON.parse(this.responseText)
  console.log(commits)
  const commitsList = `<ul>${commits.map(commit => '<li>' + `${commit.author.login}` + '/' + `${commit.commit.committer.name}` + '/' + `${commit.commit.message}` + '</li>').join("")}</ul>`
  console.log(commitsList)
  document.getElementById('details').innerHTML = commitsList
}

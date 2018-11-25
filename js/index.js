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
  const repoList = `<ul>${repos.map(r => '<li>'
    + r.name
    + ` - <a href="${r.html_url}">`
    + r.html_url + '</a>'
    + '<br>'
    + `<a href="#" data-username="${r.owner.login}" data-repository="${r.name}"
      onclick="getCommits(this)">Get Commits</a>`
    + '<br>'
    + `<a href="#" data-username="${r.owner.login}" data-repository="${r.name}"
      onclick="getBranches(this)">Get Branches</a>`
    + '</li>'
    + '<br>').join('')}</ul>`
  document.getElementById('repositories').innerHTML = repoList
}

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
  const commitsList = `<ul>${commits.map(commit => '<li>'
    + commit.author.login
    + '/' + commit.commit.committer.name
    + '/' + commit.commit.message + '</li>').join("")}</ul>`
  document.getElementById('details').innerHTML = commitsList
}

function getBranches(el) {
  let repoName = el.dataset.repository
  let user = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayBranches)
  req.open('GET', `https://api.github.com/repos/${user}/${repoName}/branches`)
  req.send()
}

function displayBranches() {
  // fills the details div with a list of names of each branch of the repo
  let branches = JSON.parse(this.responseText)
  console.log(branches)
  const branchesList = `<ul>${branches.map(branch => '<li>'
    + branch.name + '</li>').join("")}`
  document.getElementById('details').innerHTML = branchesList
}

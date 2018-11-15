// your code here
function displayCommits() {
  let commits = JSON.parse(this.responseText)
  let commitsList = `<ul>${commits.map(commit =>
      '<li>' + commit.commit.author.name + ' - ' + commit.author.login + ' - ' + commit.commit.message + '</li>').join('')}</ul>`

  document.getElementById('details').innerHTML = commitsList
}

function displayBranches() {
  let branches = JSON.parse(this.responseText)
  let branchesList = `<ul>${branches.map(branch =>
      '<li>' + branch.name + '</li>').join('')}</ul>`

  document.getElementById('details').innerHTML = branchesList
}

function displayRepositories() {
  let repos = JSON.parse(this.responseText)
  let reposList = `<ul>${repos.map(repo =>
      '<li>' + repo.full_name + ' - ' + repo.html_url + '</li>').join('')}</ul>`
  document.getElementById('repositories').innerHTML = reposList
}

function getRepositories() {
  let req = new XMLHttpRequest()
  req.open('GET', 'https://api.github.com/users/octocat/repos')
  req.send()
}

function getCommits() {
  let req = new XMLHttpRequest()
  req.open('GET', 'https://api.github.com/repos/octocat/Spoon-Knife/commits')
  req.send()
}

function getBranches() {
  let req = new XMLHttpRequest()
  req.open('GET', 'https://api.github.com/repos/octocat/Spoon-Knife/branches')
  req.send()
}

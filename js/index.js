// your code here
function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayRepositories)
  const username = document.getElementById('username').value
  req.open('GET', `https://api.github.com/users/${username}/repos` )
  req.send()
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText)
  // console.log(repos)
  const repoList = `<ul>${repos.map(
    r => '<li>' +
    r.name +
    ' - ' +
    r.owner.login +
    ' - <a href="https://github.com/' +
    r.full_name +
    '">Link</a>'+
    ' - <a href="#" data-repo="' +
    r.name +
    '" onclick="getCommits(this)">Get Commits </a>' +
    '- <a href="#" data-repo="' +
    r.name +
    '" onclick="getBranches(this)">Get Branches </a>' +
    '</li>'
  ).join('')}
  </ul>`
  document.getElementById('repositories').innerHTML = repoList
}

function getCommits(el) {
  const name = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayCommits)
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + name + '/commits')
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  // console.log(commits)
  const commitList = `<ul>${commits.map(
    c => '<li>' +
    c.commit.committer.name +
    ' - ' +
    c.committer.login +
    ' - ' +
    c.commit.message +
    '</li>'
  ).join('')}</ul>`
  document.getElementById('details').innerHTML = commitList
}

function getBranches(el) {
  const name = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayBranches)
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + name +'/branches')
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  console.log(branches)
  const branchList = `<ul>${branches.map(
    b => '<li>' +
    b.name +
    '</li>'
  ).join('')}`
  document.getElementById('details').innerHTML = branchList
}

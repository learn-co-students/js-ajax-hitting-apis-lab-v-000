const rootURL = 'https://api.github.com'

function getRepositories () {
  const name = document.getElementById('username').value
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayRepositories)
  req.open('GET', rootURL + '/users/' + name + '/repos')
  req.send()
  return false
}

function displayRepositories () {
  const repos = JSON.parse(this.responseText)
  const repoList = '<ul>' + repos.map(repo => {
    const dataUsername = 'data-username="' + repo.owner.login + '"'
    const dataRepoName = 'data-repository="' + repo.name + '"'
    return (`
          <li>
            <h4>${repo.name}</h4>
            <a href="${repo.html_url}">${repo.html_url}</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
          </li>`
    )
  }).join('') + '</ul>'
  document.getElementById('repositories').innerHTML = repoList
}

function getCommits (el) {
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayCommits)
  req.open('GET', rootURL + '/repos/' + el.dataset.username + '/' + el.dataset.repository + '/commits')
  req.send()
}

function displayCommits () {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><h4>' + commit.commit.author.name + ' (' + commit.author.login + ')</h4>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById('details').innerHTML = commitsList
}

function getBranches (el) {
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayBranches)
  req.open('GET', rootURL + '/repos/' + el.dataset.username + '/' + el.dataset.repository + '/branches')
  req.send()
}

function displayBranches () {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById('details').innerHTML = branchesList
}

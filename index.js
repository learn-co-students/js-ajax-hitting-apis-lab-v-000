rootURL = 'https://api.github.com'

function displayRepositories() {
   const repos = JSON.parse(this.responseText)
   console.log(repos)
   const repoList = `<ul>${repos.map(repo => '<li><a href="' + repo.html_url + '">' + repo.name + '</a>' + ' - <a href="#" data-repository="' + repo.name + '" data-username="' + repo.owner.login + '" onclick="getCommits(this)">Get Commits</a> | <a href="#" data-repository="' + repo.name + '" data-username="' + repo.owner.login + '" onclick="getBranches(this)">Get Branches</a>' + '</li>').join('')}</ul>`
   document.getElementById('repositories').innerHTML = repoList
}

function getRepositories() {
   const username = document.getElementById('username').value
   const req = new XMLHttpRequest()
   req.addEventListener('load', displayRepositories)
   req.open('GET', rootURL + '/users/' + username + '/repos')
   req.send()
}

function displayCommits() {
   const commits = JSON.parse(this.responseText)
   const commitList = `<ul>${commits.map(commit => '<li>' + commit.author.login + ' - ' + commit.commit.author.name + ' - ' + commit.commit.message + '</li>').join('')}</ul>`
   document.getElementById('details').innerHTML = commitList
}

function getCommits(el) {
   const repo = el.dataset.repository
   const username = el.dataset.username
   const req = new XMLHttpRequest()
   req.addEventListener('load', displayCommits)
   req.open('GET', rootURL + '/repos/' + username + '/' + repo + '/commits')
   req.send()
}

function displayBranches() {
   const branches = JSON.parse(this.responseText)
   const branchList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
   document.getElementById('details').innerHTML = branchList
}

function getBranches(el) {
   const repo = el.dataset.repository
   const username = el.dataset.username
   const url = rootURL + '/repos/' + username + '/' + repo + '/branches'
   const req = new XMLHttpRequest()
   req.addEventListener('load', displayBranches)
   req.open('GET', url)
   req.send()
}
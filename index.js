function getRepositories() {
  const uname = document.getElementById('username').value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", 'https://api.github.com/users/' + uname + '/repos')
  console.log("GET", 'https://api.github.com/users/' + uname + '/repos')
  req.send()
}

function displayRepositories(event, data) {
  repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + '<a href=https://github.com/' + r.full_name + '>' + r.name + '</a> <br /> <a href="#" data-username=' + r.owner.login + ' data-repository=' + r.name + ' onclick="getCommits(this)">See Commits</a> - <a href="#" data-username=' + r.owner.login + ' data-repository=' + r.name + ' onclick="getBranches(this)">See Branches</a>' + '</li><br />').join('')}`
  document.getElementById('repositories').innerHTML = repoList
}

function getCommits(link) {
  console.log('you called getCommits!')
  console.log(link)
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + link.dataset.username + '/' + link.dataset.repository + '/commits')
  console.log("GET", 'https://api.github.com/repos/' + link.dataset.username + '/' + link.dataset.repository + '/commits')
  req.send()
}

function displayCommits(event, data) {
  console.log('you called displayCommits!')
  commits = JSON.parse(this.responseText)
  console.log(commits)
  const commitsList = `<ul>${commits.map(c => '<li><strong>@' + c.committer.login + '</strong> - ' + c.commit.author.name + '<br> <em>' + c.commit.committer.date + '</em><br>' + c.commit.message + '</li><br />').join('')}`
  document.getElementById('details').innerHTML = commitsList
}

function getBranches(link) {
  console.log('you called getBranches!')
  console.log(link)
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/' + link.dataset.username + '/' + link.dataset.repository + '/branches')
  console.log("GET", 'https://api.github.com/repos/' + link.dataset.username + '/' + link.dataset.repository + '/branches')
  req.send()
}

function displayBranches(event, data) {
  console.log('you called displayBranches!')
  branches = JSON.parse(this.responseText)
  console.log(branches)
  const branchesList = `<ul>${branches.map(b => '<li>' + b.name + '</li>').join('')}`
  document.getElementById('details').innerHTML = branchesList
}

function getRepositories() {
  const username = document.getElementById("username").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", 'https://api.github.com/users/' + username + '/repos')
  req.send()
}

function getCommits(el) {
  const username = document.getElementById("username").value
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + name + '/commits')
  req.send()
}

function getBranches(el) {
  const username = document.getElementById("username").value
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + name + '/branches')
  req.send()
}

function displayRepositories() {
  const username = document.getElementById("username").value
  let repos = JSON.parse(this.responseText)
  // const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' ' + r.html_url + ' - ' + username + ' - <a href="#" data-repository="' + r.name + '" onclick="getCommits(this)">Get Commits</a>' + ' - <a href="#" data-repository="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  const repoList = `<ul>${repos.map(r => '<li>' + '<a href=' + r.html_url + '>' + r.name + '</a>' + ' - ' + username + ' - <a href="#" data-repository="' + r.name + '" onclick="getCommits(this)">Get Commits</a>' + ' - <a href="#" data-repository="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`

  document.getElementById("repositories").innerHTML = repoList
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => {

    if (commit.author) {
      return '<li><strong>' + commit.commit.author.name + ' - ' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>'
    } else {
      return '<li><strong>' + commit.commit.author.name + '</strong> - ' + commit.commit.message + '</li>'
    }

  }).join('')}</ul>`

  document.getElementById("details").innerHTML = commitsList
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  let branchesList = `<ul>${branches.map(branch => '<li>' + branch.name +'</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

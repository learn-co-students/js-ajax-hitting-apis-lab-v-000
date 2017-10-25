function getRepositories() {
  let name = document.getElementById("username").value
  let req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", 'https://api.github.com/users/' + name + '/repos')
  req.send()
}

function displayRepositories() {
  let repos = JSON.parse(this.responseText)
  console.log(repos)
  let repoList = "<ul>" + repos.map(r => {
    let username = 'data-username"' + r.owner.login + '"'
    let repoName = 'data-repository="' + r.name + '"'
    return (`
      <li>
      <h2>${r.name}</h2>
      <a href="${r.html_url}">${r.html_url}</a><br>
      <a href="#" ${repoName} ${username} onclick="getCommits(this)">Get Commits</a><br>
      <a href="#" ${repoName} ${username} onclick="getBranches(this)">Get Branches</a></li>
      </li>
      `)
  }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  let username = document.getElementById("username").value
  const name = el.dataset.repository 
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + name + '/commits')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + ' (' + commit.author.login + ')</strong>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}


function getBranches(el) {
  let username = document.getElementById("username").value
  const branch = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + branch + '/branches')
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchList = `<ul>${branches.map(b => '<li>' + b.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchList
}









function displayRepositories(event, data){
  let repos = JSON.parse(this.responseText)
  console.log(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - ' + '<a href="#" data-repo="' + r.html_url +'>' + r.html_url + '</a></li> - <li><a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-branch="' + r.branches_url + '" onclick="getBranches(this)">Get Branches</a> </li>').join('')}</ul>`;
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  let username = document.getElementById("username").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + ' - ' + commit.commit.committer.name + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getCommits(el){
  const repository = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  //debugger
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repository + '/commits')
  req.send()
}


function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>' )}`
  document.getElementById("details").innerHTML = branchesList
  //debugger
}

function getBranches(el){
  const repository = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repository + '/branches')
  req.send()
  //debugger
}

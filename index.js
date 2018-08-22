function getRepositories() {
  var username = document.getElementById("username").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  const path = 'https://api.github.com/users/' + username + '/repos'
  req.open("GET", path)
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  //const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' ' + r.owner.login + ' ' + r.html_url + '</li>').join('')}</ul>`
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' ' + r.owner.login + ' ' + r.html_url + ' '+ ' <a href="#" data-repository="' + r.name + '" onclick="getCommits(this)">Get Commits</a>' + ' ' + ' <a href="#" data-repository="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  var username = document.getElementById("username").value
  const name = el.dataset.repository
  //debugger
  console.log(el)
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  const path = 'https://api.github.com/repos/' + username + '/' + name +'/commits'
  req.open("GET", path)
  //debugger;
  req.send()
}

function displayCommits(){
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + '</strong> ' + commit.commit.message + ' '+ commit.author.login +'</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el){
  const username = document.getElementById("username").value
  const name = el.dataset.repository
  //const login = el.owner.login
  debugger;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  const path = 'https://api.github.com/repos/' + username + '/' + name +'/branches'
  req.open("GET", path)
  //debugger;
  req.send()
  debugger;
}

function displayBranches(){
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + ' '+'</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

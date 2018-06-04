function displayRepositories(event, data){
  let repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + '<br> <a href="https://github.com/' + r.owner.login + '/' + r.name + '"> View </a><br> <a href="#" data-repository="' + r.name +'" data-username="' + r.owner.login + '" onclick="javascript:getCommits(this)"> Commits </a><br><a href="#" data-repository="' + r.name +'" data-username="' + r.owner.login + '" onclick="javascript:getBranches(this)"> Branches </a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML += repoList
}

function getRepositories() {
  const username = document.getElementById("username").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.committer.name + ' - '+ commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML += commitsList
}

function getCommits(el) {
  const name = el.dataset.repository
  const user = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${user}/${name}/commits`)
  req.send()
}

function displayBranches(){
  const branches = JSON.parse(this.responseText)
  const branchesList = branches.map(b => ` ${b.name}`)
  document.getElementById("details").innerHTML += branchesList
}

function getBranches(el){
  const name = el.dataset.repository
  const user = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", `https://api.github.com/repos/${user}/${name}/branches`)
  req.send()
}

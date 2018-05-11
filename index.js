function getRepositories() {
  const req = new XMLHttpRequest();

  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/' + document.getElementById("username").value + '/repos');
  req.send();

}

function displayRepositories(event) {

  const repos = JSON.parse(this.responseText);

  const repoList = `<ul>${repos.map(repo => '<li><a href="' + repo.html_url + '">' + repo.name + '</a>' + '- <a href="#" data-repository="' + repo.name + '" data-username="' + repo.owner.login + '" onclick="getCommits(this)">Get Commits</a> <a href="#" data-repository="' + repo.name + '" data-username="' + repo.owner.login + '" onclick="getBranches(this)">Get Branches</a></li>').join(' ')}</ul>`

  document.getElementById("repositories").innerHTML = repoList
}


function getCommits(element) {
  const req = new XMLHttpRequest()

  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + element.dataset.username + '/' + element.dataset.repository + '/commits')
  req.send()
}

function displayCommits(event) {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li>' + commit.author.login + ' - ' + commit.commit.author.name + ' - '+ commit.commit.message + '</li>').join(' ')}</ul>`

  document.getElementById("details").innerHTML = commitsList
}

function getBranches(element) {
  const req = new XMLHttpRequest()

  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/' + element.dataset.username + '/' + element.dataset.repository + '/branches')
  req.send()
}

function displayBranches(event) {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join(' ')}</ul>`
  debugger;

  document.getElementById("details").innerHTML = branchesList
}

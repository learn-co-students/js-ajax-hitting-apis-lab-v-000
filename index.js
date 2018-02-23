function getRepositories() {
  const req = new XMLHttpRequest()
  var userName = document.getElementById("username").value;
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${userName}/repos`)
  req.send()
}

function displayRepositories(event, data) {
  //this is set to the XMLHttpRequest object that fired the event
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  // const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="https://github.com/octocat/'+r.name+'">Get Repo</a></li>').join('')}</ul>`
  // https://github.com/octocat/Hello-World
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.open("GET", 'https://api.github.com/repos/octocat/Spoon-Knife/commits')
  req.send()
}

function displayCommits() {

}

function getBranches() {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.open("GET", 'https://api.github.com/repos/octocat/Spoon-Knife/branches')
  req.send()
}

function displayBranches() {

}

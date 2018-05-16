function getRepositories() {
  let username = document.getElementById("username").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function displayRepositories() {
  console.log("hit")
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="'
   + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits() {

}

function displayCommits () {

}

function getBranches() {

}

function displayBranches() {

}

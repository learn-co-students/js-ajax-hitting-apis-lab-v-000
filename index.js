const giturl = "https://api.github.com/"

function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList =
    `<ul>${repos.map(r =>
      const dataUsername = 'data-username="' + r.owner.login + '"'
      '<li>' + r.name + '</li>').join('')}
     </ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories)
  var user = document.getElementById("username").value
  var uri = giturl + "users/" + user + "/repos"
  req.open("GET", uri)
  req.send()
}

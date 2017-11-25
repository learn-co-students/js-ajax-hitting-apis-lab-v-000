
function showRepositories(event) {
  debugger

  let repos = JSON.parse(this.responseText)
  console.log(repos)

  let repolist = `<ul>${repos.map(r => '<li>' + r.name + '- <a href="' + r.html_url + '">Link to Repo</a> - <a href="#" onclick="getCommits()"> Show Commits</a>' + '</li>').join('')}</ul>`
  debugger
  document.getElementById('repositories').innerHTML = repolist
}

function getRepositories(){
  let username = document.getElementById('username').value
  const req = new XMLHttpRequest()
  debugger
  req.addEventListener("load", showRepositories);
  debugger
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  debugger
  req.send()
}


function showCommits(){

}

function getCommits(){

}

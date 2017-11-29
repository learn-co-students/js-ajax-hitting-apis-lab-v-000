function getRepositories(){
  username = document.getElementById("git-user").value
  let api_query = 'https://api.github.com/users/' + username + '/repos'
  debugger
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories)
  req.open("GET", api_query)
  req.send()
}

function showRepositories(event, data){
  let repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(repo => '<li>' + repo.name +
  ' - <a href="#" data-repo="' + repo.name +
  '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {

}
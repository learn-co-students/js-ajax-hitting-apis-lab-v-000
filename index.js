const githubURL = "https://api.gitub.com"

function getRepositories(){
  const name = document.getElementById("username").value
  const uri = githubURL + "/users/" + name + "/repos"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", uri)
  req.send()
  return false
}

const rootURL = "https://api.github.com"

function getRepositories(){
  const name = document.getElementById("username").value
  const uri = rootURL + "/users" + name + "/repos"
  const xhr = newXMLHttpRequest()
  xhr.addEventListener("load", displayRepositories)
  xhr.open("GET", uri)
  xhr.send()
  return false;
}
function displayRepositories(){
  const repos = JSON.parse(this.responseText)
  const repoLIst = "<ul>" + repos.map(repo =>{
    const dataUsername = 'data-username="' + repo.owner.login + '"'
    const dataRepoName = 'data-repository=' + repo.name + '"'
    return(`
      <li>
        <h2>${repo.name}</h2>

      </li>`
    )
  }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList
}
